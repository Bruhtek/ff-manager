import type { Actions, PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import getSeries from '$lib/server/database/functions/getSeries';
import getUserProtection from '$lib/Utilities/getUserProtection';
import mapToISerie from '$lib/server/mapToISerie';

export const actions = {
	default: async ({ request, locals }) => {},
} satisfies Actions;

export const load = (async ({ request, url, locals }) => {
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
