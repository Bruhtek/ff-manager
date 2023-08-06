import { ChapterModel } from '$lib/server/database/schemas/ChapterSchema';
import ensureConnection from '$lib/server/database/utils/ensureConnection';

export default async (id: string) => {
	await ensureConnection();

	return await ChapterModel.find({ seriesId: id }).exec();
};
