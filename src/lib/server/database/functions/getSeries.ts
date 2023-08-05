import { SerieModel } from '$lib/server/database/schemas/SeriesSchema';

export default async (protection: 'public' | 'protected' | 'private' = 'public') => {
	// if public, return only public
	if (protection === 'public') {
		return await SerieModel.find({ protection: 'public' }).exec();
	}
	// if protected, return both public and protected
	if (protection === 'protected') {
		return await SerieModel.find({ protection: { $in: ['public', 'protected'] } }).exec();
	}
	// if private, return all
	if (protection === 'private') {
		return await SerieModel.find({}).exec();
	}
};
