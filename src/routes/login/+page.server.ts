import type { Actions, PageServerLoad } from './$types';
import loginUser from '$lib/server/database/functions/loginUser';
import { fail, redirect } from '@sveltejs/kit';
import createToken from '$lib/server/database/functions/createToken';

export const load = (({ locals }) => {
	if (locals.user !== null) {
		return {
			status: 302,
			redirect: '/',
		};
	}
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		// if we have the id field, we've just logged out
		if (data.get('id') !== null) return fail(400, { logout: true });

		const username = data.get('username') as string;
		const password = data.get('password') as string;

		if (!username || !password) {
			return fail(400, { username, missing: true });
		}

		const user = await loginUser(username, password);

		if (user === null) {
			return fail(400, { username, invalid: true });
		}

		const token = await createToken(user);
		cookies.set('sessionToken', token, {
			path: '/',
			maxAge: 60 * 60 * 24 * 7,
		});

		redirect(302, '/');
	},
} satisfies Actions;
