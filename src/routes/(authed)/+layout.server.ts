// a load function which checks cookies and returns a user object
import type { LayoutServerLoad } from '../../../.svelte-kit/types/src/routes/(authed)/$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ locals }) => {
	if (!locals.user) {
		throw redirect(307, '/login');
	}
}) satisfies LayoutServerLoad;
