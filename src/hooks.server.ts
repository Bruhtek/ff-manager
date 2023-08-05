import type { Handle } from '@sveltejs/kit';
import verifyToken from '$lib/server/database/functions/verifyToken';
import type { User } from '$lib/types/user';

export const handle = (async ({ event, resolve }) => {
	const sessionToken = event.cookies.get('sessionToken');
	if (sessionToken) {
		const user: User | null = await verifyToken(sessionToken);

		if (user) {
			event.locals.user = user;
		} else {
			event.cookies.delete('sessionToken');
		}
	}

	return resolve(event);
}) satisfies Handle;
