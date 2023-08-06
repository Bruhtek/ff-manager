import type { User } from '$lib/types/user';
import crypto from 'crypto';
import { TokenModel } from '$lib/server/database/schemas/TokenSchema';
import ensureConnection from '$lib/server/database/utils/ensureConnection';

export default async (user: User): Promise<string> => {
	await ensureConnection();

	const secureToken = crypto.randomBytes(64).toString('hex');

	const token = new TokenModel({
		userId: user.id,
		expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
		token: secureToken,
	});

	await token.save();

	return secureToken;
};
