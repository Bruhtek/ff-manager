import type { LayoutLoad } from './$types';
import { pageImporterData } from '$lib/importer/main';
import { error } from '@sveltejs/kit';

export const load = (async ({ params }) => {
	const wantedImporter = params.importer;
	const importer = pageImporterData.find((i) => i.name === wantedImporter);
	if (!importer) {
		error(404, 'Importer not found');
	}

	return {
		importer,
	};
}) satisfies LayoutLoad;
