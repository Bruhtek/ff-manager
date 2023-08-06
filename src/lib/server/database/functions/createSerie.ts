import type { ISerie } from '$lib/server/database/schemas/SeriesSchema';
import { SerieModel } from '$lib/server/database/schemas/SeriesSchema';
import ensureConnection from '$lib/server/database/utils/ensureConnection';

export default async (serie: ISerie) => {
	await ensureConnection();

	const newSerie = new SerieModel(serie);
	await newSerie.save();
	return newSerie;
};
