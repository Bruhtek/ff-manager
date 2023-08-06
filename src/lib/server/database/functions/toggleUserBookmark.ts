import { UserModel } from '$lib/server/database/schemas/UserSchema';
import ensureConnection from '$lib/server/database/utils/ensureConnection';

export default async (userId: string, seriesId: string): Promise<boolean> => {
	await ensureConnection();

	const user = await UserModel.findById(userId);
	if (!user) return false;

	const index = user.bookmarks.indexOf(seriesId);
	if (index === -1) {
		user.bookmarks.push(seriesId);
	} else {
		user.bookmarks.splice(index, 1);
	}

	await user.save();
	return index === -1;
};
