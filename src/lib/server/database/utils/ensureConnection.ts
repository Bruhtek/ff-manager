import { env } from '$env/dynamic/private';
import mongoose from 'mongoose';

export default async () => {
	if (env.MONGODB_CONNECTION_STRING === undefined)
		throw new Error('MONGODB_CONNECTION_STRING is undefined');

	if (mongoose.connection.readyState !== 1) {
		await mongoose.connect(env.MONGODB_CONNECTION_STRING);
	}
};
