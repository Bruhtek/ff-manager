import type { RequestHandler } from './$types';
import { UserModel } from '$lib/server/database/schemas/UserSchema';
import ensureConnection from '$lib/server/database/utils/ensureConnection';

export const POST = (async ({ params, request, locals }) => {
	await ensureConnection();
	const { bookmark } = await request.json();
	const user = await UserModel.findOne({ _id: locals.user?.id });

	if (!user) return new Response('false');

	if (bookmark) {
		user.bookmarks.push(params.slug);
	} else {
		user.bookmarks.splice(user.bookmarks.indexOf(params.slug), 1);
	}

	await user.save();

	return new Response(bookmark.toString());
}) satisfies RequestHandler;
