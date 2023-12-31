import type { LayoutServerLoad } from './$types';
import getSeries from '$lib/server/database/functions/getSeries';
import checkPermissions from '$lib/Utilities/checkPermissions';
import mapToISerie from '$lib/server/mapToISerie';

export const load = (async ({ locals }) => {
	let protection: 'public' | 'protected' | 'private' = 'public';
	if (locals.user !== null) {
		protection = 'protected';
	}
	if (locals.user && checkPermissions(locals.user, 'view:private')) {
		protection = 'private';
	}

	const series = await getSeries(protection, {});

	if (!series) return { series: [] };

	return {
		series: series.map((item) => mapToISerie(item)),
	};
}) satisfies LayoutServerLoad;
