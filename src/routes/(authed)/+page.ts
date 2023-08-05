import type { PageLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (() => {
	throw redirect(301, '/series');
}) satisfies PageLoad;
