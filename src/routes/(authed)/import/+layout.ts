import type { LayoutLoad } from './$types';
import { pageImporterData } from '$lib/importer/main';

export const load = (() => {
	const importers = pageImporterData;
	return {
		importers,
	};
}) satisfies LayoutLoad;
