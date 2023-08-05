import type { HydratedDocument } from 'mongoose';
import mongoose from 'mongoose';

import type { IUser } from '$lib/server/database/schemas/UserSchema';
import { UserModel } from '$lib/server/database/schemas/UserSchema';

import { env } from '$env/dynamic/private';

export default async (id: string): Promise<HydratedDocument<IUser>> => {
	if (env.MONGODB_CONNECTION_STRING === undefined)
		throw new Error('MONGODB_CONNECTION_STRING is undefined');

	if (mongoose.connection.readyState !== 1) {
		await mongoose.connect(env.MONGODB_CONNECTION_STRING);
	}

	const user = await UserModel.findOne({ _id: id }).exec();

	if (user === null || user._id === undefined || user.username === undefined) {
		throw new Error('User not found');
	}

	return user;
};
