import { SerieModel } from '$lib/server/database/schemas/SeriesSchema';
import type { LayoutServerLoad } from './$types';
import getSeries from '$lib/server/database/functions/getSeries';
import checkPermissions from '$lib/Utilities/checkPermissions';
import mapToISerie from '$lib/server/mapToISerie';

export const load = (async ({ params, locals }) => {
	const tags: string[] = await SerieModel.distinct('tags').exec();
	tags.sort();

	const authors: string[] = await SerieModel.distinct('authors').exec();
	authors.sort();

	let protection = 'public';
	if (locals.user) {
		protection = 'protected';
	}
	if (locals.user && checkPermissions(locals.user, 'view:private')) {
		protection = 'private';
	}
	const initialSeries = await getSeries(protection as 'public' | 'protected' | 'private', {});

	return {
		tags,
		authors,
		series: initialSeries.map((serie) => mapToISerie(serie)),
	};
}) satisfies LayoutServerLoad;
