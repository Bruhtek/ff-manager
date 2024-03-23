import type { PageServerLoad } from './$types';
import { importers } from '$lib/importer/main';
import type { Actions } from '@sveltejs/kit';
import { error, fail, redirect } from '@sveltejs/kit';
import type { ISerie } from '$lib/server/database/schemas/SeriesSchema';
import { SerieModel } from '$lib/server/database/schemas/SeriesSchema';
import { uuid } from '$lib/Utilities/uuid';
import createSerie from '$lib/server/database/functions/createSerie';
import type { IChapter } from '$lib/server/database/schemas/ChapterSchema';
import createChapter from '$lib/server/database/functions/createChapter';

export const load = (async ({ params }) => {
	const wantedImporter = params.importer;
	const serieUrl = params.url;

	const importer = importers.find((i) => i.name === wantedImporter);
	if (!importer) {
		error(404, 'Importer not found');
	}

	const serieData = await importer.getDataFromURL(serieUrl);
	if ('error' in serieData) {
		error(500, serieData.error);
	}

	serieData.name = serieData.name.trim();
	serieData.authors = serieData.authors.map((a) => a.trim());
	serieData.tags = serieData.tags.map((t) => t.trim());

	const tags: string[] = await SerieModel.distinct('tags').exec();
	tags.sort();

	const authors: string[] = await SerieModel.distinct('authors').exec();
	authors.sort();

	return {
		name: importer.name,
		serieUrl,
		serieData: serieData,
		authors,
		tags,
	};
}) satisfies PageServerLoad;

type ChapterData = {
	name: string;
	content: string;
	url?: string;
	summary?: string;
};

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
		let chapters = formData
			.getAll('chapter')
			.map((c) => JSON.parse(c as string) as ChapterData) as ChapterData[];

		// delete empty authors and tags
		authors = authors.filter((author) => author);
		tags = tags.filter((tag) => tag);

		if (!title || !authors) {
			return fail(400, {
				error: 'Missing required fields',
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

		for (const chapterData of chapters) {
			const chapter = {
				_id: uuid(),
				seriesId: serie._id,
				summary: chapterData.summary,
				url: chapterData.url,
				title: chapterData.name,
				content: chapterData.content,
				created: new Date(),
			} satisfies IChapter;

			await createChapter(chapter);
		}

		redirect(302, `/series/${serie._id}`);
	},
} satisfies Actions;
