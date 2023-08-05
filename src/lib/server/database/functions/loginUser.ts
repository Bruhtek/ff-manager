import type { User } from '$lib/types/user';
import mongoose from 'mongoose';

import { UserModel } from '$lib/server/database/schemas/UserSchema';

import { env } from '$env/dynamic/private';

export default async (username: string, password: string): Promise<User | null> => {
	if (env.MONGODB_CONNECTION_STRING === undefined)
		throw new Error('MONGODB_CONNECTION_STRING is undefined');

	if (mongoose.connection.readyState !== 1) {
		await mongoose.connect(env.MONGODB_CONNECTION_STRING);
	}

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
	};
};
