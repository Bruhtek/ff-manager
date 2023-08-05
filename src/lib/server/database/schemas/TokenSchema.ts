import * as mongoose from 'mongoose';

export interface IToken {
	_id: string;
	token: string;
	userId: string;
	expires: Date;
}

export const TokenSchema = new mongoose.Schema({
	token: { type: String, required: true },
	userId: { type: String, required: true },
	expires: { type: Date, required: true },
});

export const TokenModel = mongoose.model<IToken>('Token', TokenSchema);
