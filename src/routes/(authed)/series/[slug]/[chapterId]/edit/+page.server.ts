import type { Actions } from '@sveltejs/kit';
import { error, fail, redirect } from '@sveltejs/kit';
import checkPermissions from '$lib/Utilities/checkPermissions';
import type { PageServerLoad } from './$types';
import getChapterById from '$lib/server/database/functions/getChapterById';
import { ChapterModel } from '$lib/server/database/schemas/ChapterSchema';

export const load = (async ({ locals }) => {
	if (locals.user === null) {
		throw error(401, 'Not logged in');
	}
	if (!checkPermissions(locals.user, 'edit:chapters')) {
		throw error(403, 'Not authorized');
	}

	return {};
}) satisfies PageServerLoad;

export const actions = {
	save: async ({ request, params }) => {
		const formData = await request.formData();

		const title = formData.get('title') as string;
		const url = formData.get('url') as string;
		const summary = formData.get('summary') as string;
		const content = formData.get('content') as string;

		if (!title || !content) {
			return fail(400, {
				error: 'Missing required fields',
				title,
				url,
				summary,
				content,
			});
		}

		const chapter = await getChapterById(params.chapterId ?? '');
		if (!chapter) {
			return fail(404, {
				error: 'Chapter not found',
			});
		}

		chapter.title = title;
		chapter.url = url;
		chapter.summary = summary;
		chapter.content = content;

		await chapter.save();

		throw redirect(302, `/series/${params.slug}/${chapter._id}`);
	},
	delete: async ({ params }) => {
		const res = await ChapterModel.deleteOne({ _id: params.chapterId });
		if (res.deletedCount === 0) {
			return fail(404, {
				error: 'Chapter not found',
			});
		}

		throw redirect(302, `/series/${params.slug}`);
	},
} satisfies Actions;
