import type { PageServerLoad } from '../../../../.svelte-kit/types/src/routes';
import getSeries from '$lib/server/database/functions/getSeries';
import getUserProtection from '$lib/Utilities/getUserProtection';
import mapToISerie from '$lib/server/mapToISerie';

export const load = (async ({ url, locals }) => {
	const tags = url.searchParams.getAll('tags') as string[];
	const authors = url.searchParams.getAll('authors') as string[];

	const series = await getSeries(getUserProtection(locals.user ?? undefined), {
		tagFilter: tags,
		authorFilter: authors,
	});

	return {
		series: series.map((s) => mapToISerie(s)),
		selectedTags: tags,
		selectedAuthors: authors,
	};
}) satisfies PageServerLoad;
