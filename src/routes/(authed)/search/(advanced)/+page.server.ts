import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import getSeries from '$lib/server/database/functions/getSeries';
import getUserProtection from '$lib/Utilities/getUserProtection';
import mapToISerie from '$lib/server/mapToISerie';

export const actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();

		const tags = formData.getAll('tags') as string[];
		const authors = formData.getAll('authors') as string[];

		console.log(tags, authors);

		if (!tags.length && !authors.length) {
			throw redirect(302, '/search/');
		}

		const series = await getSeries(getUserProtection(locals.user ?? undefined), {
			tagFilter: tags,
			authorFilter: authors,
		});

		return {
			series: series.map((s) => mapToISerie(s)),
		};
	},
} satisfies Actions;
