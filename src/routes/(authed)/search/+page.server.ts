import type { PageServerLoad } from './$types';
import getSeries, { Options } from '$lib/server/database/functions/getSeries';
import getUserProtection from '$lib/Utilities/getUserProtection';
import mapToISerie from '$lib/server/mapToISerie';

export const load = (async ({ url, locals }) => {
	const tags = url.searchParams.getAll('tags') as string[];
	const authors = url.searchParams.getAll('authors') as string[];
	const onlyBookmarked = url.searchParams.get('onlyBookmarked') === 'true';
	const sort = url.searchParams.get('sort') as Options['sort'];
	const rating = url.searchParams.get('rating') as Options['rating'];

	let idFilter: string[] | undefined = undefined;
	if (onlyBookmarked) {
		idFilter = locals.user?.bookmarks ?? undefined;
	}

	const series = await getSeries(getUserProtection(locals.user ?? undefined), {
		tagFilter: tags,
		authorFilter: authors,
		idFilter,
		sort,
		rating,
	});

	return {
		series: series.map((s) => mapToISerie(s)),
		selectedTags: tags,
		selectedAuthors: authors,
	};
}) satisfies PageServerLoad;
