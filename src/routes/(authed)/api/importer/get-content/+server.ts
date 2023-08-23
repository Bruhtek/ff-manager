import type { RequestHandler } from './$types';
import { importers } from '$lib/importer/main';

export const GET = (async ({ url }) => {
	const seriesUrl = url.searchParams.get('url');
	const wantedImporter = url.searchParams.get('importer');
	if (!seriesUrl || !wantedImporter) {
		return new Response('No url or importer provided', { status: 400 });
	}

	const importer = importers.find((i) => i.name === wantedImporter);
	if (!importer) {
		return new Response('Invalid importer', { status: 400 });
	}

	const content = await importer.getHTMLByURL(seriesUrl);

	if ('error' in content) {
		return new Response(content.error, { status: 400 });
	}

	return new Response(content.html, {
		headers: {
			'content-type': 'text/html; charset=utf-8',
		},
	});
}) satisfies RequestHandler;
