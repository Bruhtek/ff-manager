import type { Actions } from '@sveltejs/kit';
import { error, fail, redirect } from '@sveltejs/kit';
import { uuid } from '$lib/Utilities/uuid';
import type { ISerie } from '$lib/server/database/schemas/SeriesSchema';
import createSerie from '$lib/server/database/functions/createSerie';
import type { PageServerLoad } from './$types';
import { SerieModel } from '$lib/server/database/schemas/SeriesSchema';
import checkPermissions from '$lib/Utilities/checkPermissions';

export const load = (async ({ locals }) => {
	if (locals.user === null) {
		error(401, 'Not logged in');
	}
	if (!checkPermissions(locals.user, 'create:series')) {
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
	default: async ({ request }) => {
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

		const serie = {
			_id: uuid(),
			title,
			authors,
			created: new Date(),
			tags,
			summary,
			chapterIds: [],
			protection: protection as 'public' | 'private' | 'protected',
		} satisfies ISerie;

		await createSerie(serie);

		redirect(302, `/series/${serie._id}`);
	},
} satisfies Actions;
