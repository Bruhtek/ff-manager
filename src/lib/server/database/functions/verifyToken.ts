import type { User } from '$lib/types/user';
import mongoose from 'mongoose';

import { TokenModel } from '$lib/server/database/schemas/TokenSchema';

import { env } from '$env/dynamic/private';
import { UserModel } from '$lib/server/database/schemas/UserSchema';

export default async (tokenString: string): Promise<User | null> => {
	if (env.MONGODB_CONNECTION_STRING === undefined)
		throw new Error('MONGODB_CONNECTION_STRING is undefined');

	if (mongoose.connection.readyState !== 1) {
		await mongoose.connect(env.MONGODB_CONNECTION_STRING);
	}

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
	};
};
