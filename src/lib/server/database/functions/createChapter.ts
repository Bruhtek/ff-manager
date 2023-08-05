import type { IChapter } from '$lib/server/database/schemas/ChapterSchema';
import { ChapterModel } from '$lib/server/database/schemas/ChapterSchema';
import getSerieById from '$lib/server/database/functions/getSerieById';

export default async (chapter: IChapter) => {
	const newChapter = new ChapterModel(chapter);
	await newChapter.save();

	const chapterSeries = await getSerieById(chapter.seriesId ?? '');
	if (chapterSeries) {
		chapterSeries.chapterIds.push(newChapter._id);
		await chapterSeries.save();
	}

	return newChapter;
};
