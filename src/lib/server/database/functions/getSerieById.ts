import { SerieModel } from '$lib/server/database/schemas/SeriesSchema';

export default async (id: string) => {
	return await SerieModel.findById(id).exec();
};
