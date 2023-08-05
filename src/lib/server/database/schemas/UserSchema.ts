import type { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser {
	_id: string;
	username: string;
	password: string;
	permissions: string[];
}
export interface IUserMethods {
	checkPassword: (password: string) => Promise<boolean>;
}

type UserDocument = Model<IUser, object, IUserMethods>;

export const UserSchema = new mongoose.Schema<IUser, UserDocument, IUserMethods>({
	_id: { type: String, required: true },
	username: { type: String, required: true },
	password: { type: String, required: true },
	permissions: { type: [String], required: true },
});
UserSchema.method('checkPassword', async function (password: string): Promise<boolean> {
	return await bcrypt.compare(password, this.password);
});

export const UserModel = mongoose.model<IUser, UserDocument>('User', UserSchema);
