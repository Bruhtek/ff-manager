import { ChapterModel } from '$lib/server/database/schemas/ChapterSchema';

export default async (id: string) => {
	return await ChapterModel.find({ seriesId: id }).exec();
};
