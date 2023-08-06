import * as mongoose from 'mongoose';

export interface ISerie {
	_id: string;
	title: string;
	authors: string[];
	created: Date;
	tags: string[];
	summary?: string;
	chapterIds: string[];
	protection: 'public' | 'protected' | 'private';
	rating?: number;
}

export const SerieSchema = new mongoose.Schema({
	_id: { type: String, required: true },
	title: { type: String, required: true },
	authors: { type: [String], required: true },
	created: { type: Date, required: true },
	tags: { type: [String], required: true },
	summary: String,
	chapterIds: { type: [String], required: true },
	protection: { type: String, enum: ['public', 'protected', 'private'], default: 'protected' },
	rating: { type: Number, default: 0 },
});

export const SerieModel = mongoose.model<ISerie>('Serie', SerieSchema);
