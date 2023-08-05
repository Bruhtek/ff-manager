import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (({ locals }) => {
	if (locals.user === null) {
		throw redirect(307, '/login');
	}

	return {
		user: locals.user,
	};
}) satisfies LayoutServerLoad;
