import type { User } from '$lib/types/user';
import { TokenModel } from '$lib/server/database/schemas/TokenSchema';
import { UserModel } from '$lib/server/database/schemas/UserSchema';
import ensureConnection from '$lib/server/database/utils/ensureConnection';

export default async (tokenString: string): Promise<User | null> => {
	await ensureConnection();

	const token = await TokenModel.findOne({ token: tokenString });

	if (token === null) {
		return null;
	}
	if (!token.expires || token.expires < new Date()) {
		await token.deleteOne();
		return null;
	}

	const user = await UserModel.findById(token.userId);
	if (user === null) {
		return null;
	}

	return {
		id: user._id,
		username: user.username ?? '',
		permissions: user.permissions ?? [],
		bookmarks: user.bookmarks ?? [],
	};
};
