import { SerieModel } from '$lib/server/database/schemas/SeriesSchema';
import ensureConnection from '$lib/server/database/utils/ensureConnection';

export default async (id: string) => {
	await ensureConnection();

	return await SerieModel.findById(id).exec();
};
