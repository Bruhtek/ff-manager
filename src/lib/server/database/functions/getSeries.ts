import { SerieModel } from '$lib/server/database/schemas/SeriesSchema';
import type { ISerie } from '$lib/server/database/schemas/SeriesSchema';
import type { FilterQuery } from 'mongoose';

interface Filters {
	tagFilter?: string[];
	authorFilter?: string[];
}

export default async (
	protection: 'public' | 'protected' | 'private' = 'public',
	{ tagFilter, authorFilter }: Filters,
) => {
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

	return await SerieModel.find(filters).exec();
};
