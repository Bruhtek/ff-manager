import type { Handle } from '@sveltejs/kit';
import verifyToken from '$lib/server/database/functions/verifyToken';
import type { User } from '$lib/types/user';

const auth: Handle = async ({ event, resolve }) => {
	const requestStartTime = Date.now();

	const sessionToken = event.cookies.get('sessionToken');
	if (sessionToken) {
		const user: User | null = await verifyToken(sessionToken);

		if (user) {
			event.locals.user = user;
		} else {
			/* @migration task: add path argument */ event.cookies.delete('sessionToken');
		}
	}

	const res = await resolve(event);

	// only log authenticated requests
	if (event.locals.user) {
		console.log(
			new Date(requestStartTime).toISOString(),
			event.request.method,
			event.locals.user.username,
			event.url.pathname,
			`(${Date.now() - requestStartTime}ms)`,
			res.status,
		);
	}
	return res;
};

export const handle: Handle = auth;
