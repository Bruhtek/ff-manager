import type { RequestHandler } from './$types';
import { SerieModel } from '$lib/server/database/schemas/SeriesSchema';

export const POST = (async ({ params, request }) => {
	const { rating } = await request.json();
	const series = await SerieModel.findById(params.slug ?? '');

	if (!series) return new Response('-1');

	series.rating = rating;

	await series.save();

	return new Response(series.rating?.toString());
}) satisfies RequestHandler;
