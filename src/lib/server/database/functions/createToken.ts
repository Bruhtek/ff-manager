import type { User } from '$lib/types/user';
import crypto from 'crypto';
import mongoose from 'mongoose';

import { TokenModel } from '$lib/server/database/schemas/TokenSchema';

import { env } from '$env/dynamic/private';

export default async (user: User): Promise<string> => {
	if (env.MONGODB_CONNECTION_STRING === undefined)
		throw new Error('MONGODB_CONNECTION_STRING is undefined');

	if (mongoose.connection.readyState !== 1) {
		await mongoose.connect(env.MONGODB_CONNECTION_STRING);
	}

	const secureToken = crypto.randomBytes(64).toString('hex');

	const token = new TokenModel({
		userId: user.id,
		expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
		token: secureToken,
	});

	await token.save();

	return secureToken;
};
