import type { Actions } from '@sveltejs/kit';
import { error, fail, redirect } from '@sveltejs/kit';
import type { ISerie } from '$lib/server/database/schemas/SeriesSchema';
import type { PageServerLoad } from './$types';
import { SerieModel } from '$lib/server/database/schemas/SeriesSchema';
import checkPermissions from '$lib/Utilities/checkPermissions';
import getSerieById from '$lib/server/database/functions/getSerieById';

export const load = (async ({ locals }) => {
	if (locals.user === null) {
		error(401, 'Not logged in');
	}
	if (!checkPermissions(locals.user, 'edit:series')) {
		error(403, 'Not authorized');
	}

	const tags: string[] = await SerieModel.distinct('tags').exec();
	tags.sort();

	const authors: string[] = await SerieModel.distinct('authors').exec();
	authors.sort();

	return {
		tags,
		authors,
	};
}) satisfies PageServerLoad;

export const actions = {
	save: async ({ request, params }) => {
		const formData = await request.formData();

		const title = formData.get('title') as string;
		let authors = formData.getAll('authors') as string[];
		const summary = formData.get('summary') as string;
		let protection = formData.get('protection') as string;
		if (['public', 'private', 'protected'].indexOf(protection) === -1) {
			protection = 'protected';
		}
		let tags = formData.getAll('tags') as string[];

		// delete empty authors and tags
		authors = authors.filter((author) => author);
		tags = tags.filter((tag) => tag);

		if (!title || !authors) {
			return fail(400, {
				error: 'Missing required fields',
				title,
				authors,
				summary,
				tags,
			});
		}

		const serie = await getSerieById(params.slug ?? '');
		if (!serie) {
			return fail(404, {
				error: 'Serie not found',
			});
		}

		serie.title = title;
		serie.authors = authors;
		serie.summary = summary;
		serie.tags = tags;
		serie.protection = protection as ISerie['protection'];

		await serie.save();

		redirect(302, `/series/${params.slug}`);
	},
	delete: async ({ params }) => {
		const res = await SerieModel.deleteOne({ _id: params.slug }).exec();
		if (res.deletedCount === 0) {
			error(404, 'Serie not found');
		}

		redirect(302, `/series`);
	},
} satisfies Actions;
