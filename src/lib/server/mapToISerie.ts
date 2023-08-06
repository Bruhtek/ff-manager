import type { ISerie } from '$lib/server/database/schemas/SeriesSchema';
import type { Document } from 'mongoose';

export default (item: Document<unknown, unknown, ISerie> & ISerie & Required<{ _id: string }>) => {
	return {
		_id: item._id,
		title: item.title,
		authors: item.authors,
		created: item.created,
		tags: item.tags,
		summary: item.summary,
		chapterIds: item.chapterIds,
		protection: item.protection,
		rating: item.rating,
	} as ISerie;
};
