import { SerieModel } from '$lib/server/database/schemas/SeriesSchema';
import type { ISerie } from '$lib/server/database/schemas/SeriesSchema';

export default async (serie: ISerie) => {
	const newSerie = new SerieModel(serie);
	await newSerie.save();
	return newSerie;
};
