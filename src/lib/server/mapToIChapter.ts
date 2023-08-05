import type { IChapter } from '$lib/server/database/schemas/ChapterSchema';
import type { Document } from 'mongoose';

export default (
	chapter: Document<unknown, unknown, IChapter> & IChapter & Required<{ _id: string }>,
) => {
	return {
		_id: chapter._id,
		title: chapter.title,
		created: chapter.created,
		summary: chapter.summary,
		url: chapter.url,
		content: chapter.content,
	} as IChapter;
};
