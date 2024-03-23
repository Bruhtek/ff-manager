import type { LayoutServerLoad } from './$types';
import getSerieById from '$lib/server/database/functions/getSerieById';
import { error } from '@sveltejs/kit';
import getChaptersBySerieId from '$lib/server/database/functions/getChaptersBySerieId';
import { canUserSeeThis } from '$lib/Utilities/checkPermissions';
import mapToIChapter from '$lib/server/mapToIChapter';
import mapToISerie from '$lib/server/mapToISerie';

export const load = (async ({ params, locals }) => {
	const serie = await getSerieById(params.slug);

	if (!serie) error(404, 'Serie not found');

	const canAccess = canUserSeeThis(locals.user, serie.protection);
	if (!canAccess) error(403, 'You do not have permission to view this serie');

	const chapters = await getChaptersBySerieId(serie._id);

	return {
		serie: mapToISerie(serie),
		chapters: chapters.map((chapter) => mapToIChapter(chapter)),
	};
}) satisfies LayoutServerLoad;
