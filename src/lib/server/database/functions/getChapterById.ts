import { ChapterModel } from '$lib/server/database/schemas/ChapterSchema';

export default async (id: string) => {
	return await ChapterModel.findById(id).exec();
};
