import type { LayoutServerLoad } from './$types';
import getSeries from '$lib/server/database/functions/getSeries';
import type { ISerie } from '$lib/server/database/schemas/SeriesSchema';
import checkPermissions from '$lib/Utilities/checkPermissions';

export const load = (async ({ locals }) => {
	let protection: 'public' | 'protected' | 'private' = 'public';
	if (locals.user !== null) {
		protection = 'protected';
	}
	if (locals.user && checkPermissions(locals.user, 'view:private')) {
		protection = 'private';
	}

	const series = await getSeries(protection);

	if (!series) return { series: [] };

	return {
		series: series.map(
			(item) =>
				({
					_id: item._id,
					title: item.title,
					authors: item.authors,
					created: item.created,
					tags: item.tags,
					summary: item.summary,
					chapterIds: item.chapterIds,
					protection: item.protection,
				}) as ISerie,
		),
	};
}) satisfies LayoutServerLoad;
