import type { HydratedDocument } from 'mongoose';
import type { IUser } from '$lib/server/database/schemas/UserSchema';
import { UserModel } from '$lib/server/database/schemas/UserSchema';
import ensureConnection from '$lib/server/database/utils/ensureConnection';

export default async (id: string): Promise<HydratedDocument<IUser>> => {
	await ensureConnection();

	const user = await UserModel.findOne({ _id: id }).exec();

	if (user === null || user._id === undefined || user.username === undefined) {
		throw new Error('User not found');
	}

	return user;
};
