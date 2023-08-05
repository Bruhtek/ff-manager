import * as mongoose from 'mongoose';

export interface IChapter {
	_id: string;
	seriesId?: string;
	summary?: string;
	url?: string;
	title: string;
	content: string;
	created: Date;
}

export const ChapterSchema = new mongoose.Schema({
	_id: { type: String, required: true },
	seriesId: String,
	summary: String,
	url: String,
	title: { type: String, required: true },
	content: { type: String, required: true },
	created: { type: Date, required: true },
});

export const ChapterModel = mongoose.model<IChapter>('Chapter', ChapterSchema);
