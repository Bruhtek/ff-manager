import type { Actions } from '@sveltejs/kit';
import { error, fail } from '@sveltejs/kit';
import type { IChapter } from '$lib/server/database/schemas/ChapterSchema';
import { uuid } from '$lib/Utilities/uuid';
import createChapter from '$lib/server/database/functions/createChapter';
import checkPermissions from '$lib/Utilities/checkPermissions';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	if (locals.user === null) {
		error(401, 'Not logged in');
	}
	if (!checkPermissions(locals.user, 'create:chapters')) {
		error(403, 'Not authorized');
	}

	return {};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, params }) => {
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

		const chapter = {
			_id: uuid(),
			seriesId: params.slug,
			summary,
			url,
			title,
			content,
			created: new Date(),
		} satisfies IChapter;

		await createChapter(chapter);

		return {
			success: 'Chapter created successfully',
		};
	},
} satisfies Actions;
