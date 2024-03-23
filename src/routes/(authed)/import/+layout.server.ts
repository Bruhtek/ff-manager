import { error } from '@sveltejs/kit';
import checkPermissions from '$lib/Utilities/checkPermissions';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	if (locals.user === null) {
		error(401, 'Not logged in');
	}
	if (!checkPermissions(locals.user, 'create:series')) {
		error(403, 'Not authorized');
	}
}) satisfies LayoutServerLoad;
