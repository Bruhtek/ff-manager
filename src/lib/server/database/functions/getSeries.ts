import type { ISerie } from '$lib/server/database/schemas/SeriesSchema';
import { SerieModel } from '$lib/server/database/schemas/SeriesSchema';
import type { FilterQuery } from 'mongoose';
import ensureConnection from '$lib/server/database/utils/ensureConnection';

export interface Options {
	tagFilter?: string[];
	authorFilter?: string[];
	idFilter?: string[];
	sort?: 'dateDesc' | 'dateAsc' | 'nameDesc' | 'nameAsc' | 'ratingDesc' | 'ratingAsc';
	rating?: '1' | '2' | '3' | '4' | '5';
}

export default async (
	protection: 'public' | 'protected' | 'private' = 'public',
	{ tagFilter, authorFilter, idFilter, sort, rating }: Options,
) => {
	await ensureConnection();

	const filters: FilterQuery<ISerie> = {};

	// if public, return only public
	if (protection === 'public') {
		filters['protection'] = 'public';
	}
	// if protected, return both public and protected
	if (protection === 'protected') {
		filters['protection'] = { $in: ['public', 'protected'] };
	}
	// if private, we don't need to filter

	if (tagFilter && tagFilter.length) {
		filters['tags'] = { $all: tagFilter };
	}
	if (authorFilter && authorFilter.length) {
		filters['authors'] = { $all: authorFilter };
	}
	if (idFilter && idFilter.length) {
		filters['_id'] = { $in: idFilter };
	}
	if (rating && rating !== '1') {
		filters['rating'] = { $gte: parseInt(rating) };
	}

	const series = await SerieModel.find(filters).exec();

	switch (sort) {
		case 'dateDesc':
			return series.sort((a, b) => b.created.getTime() - a.created.getTime());
		case 'dateAsc':
			return series.sort((a, b) => a.created.getTime() - b.created.getTime());
		case 'nameDesc':
			return series.sort((a, b) => b.title.localeCompare(a.title));
		case 'nameAsc':
			return series.sort((a, b) => a.title.localeCompare(b.title));
		case 'ratingDesc':
			return series.sort((a, b) => {
				if (!a.rating && !b.rating) return a.created.getTime() - b.created.getTime();
				if (!a.rating) return 1;
				if (!b.rating) return -1;
				if (a.rating === b.rating) return a.created.getTime() - b.created.getTime();
				return b.rating - a.rating;
			});
		case 'ratingAsc':
			return series.sort((a, b) => {
				if (!a.rating && !b.rating) return a.created.getTime() - b.created.getTime();
				if (!a.rating) return -1;
				if (!b.rating) return 1;
				if (a.rating === b.rating) return a.created.getTime() - b.created.getTime();
				return a.rating - b.rating;
			});
		default:
			return series;
	}
};
