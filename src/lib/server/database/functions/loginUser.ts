import type { User } from '$lib/types/user';
import { UserModel } from '$lib/server/database/schemas/UserSchema';
import ensureConnection from '$lib/server/database/utils/ensureConnection';

export default async (username: string, password: string): Promise<User | null> => {
	await ensureConnection();

	const user = await UserModel.findOne({ username }).exec();

	if (user === null || user._id === undefined || user.username === undefined) {
		return null;
	}
	const isPasswordCorrect = await user.checkPassword(password);
	if (!isPasswordCorrect) {
		return null;
	}

	return {
		id: user._id,
		username: user.username,
		permissions: user.permissions,
		bookmarks: user.bookmarks,
	};
};
