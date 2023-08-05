import type { Actions } from './$types';
import findUserById from '$lib/server/database/functions/findUserById';
import bcrypt from 'bcrypt';

export const actions = {
	logout: async ({ locals, cookies }) => {
		cookies.delete('sessionToken');
		locals.user = null;

		return {
			success: true,
		};
	},
	changePassword: async ({ locals, cookies, request }) => {
		const formData = await request.formData();
		const currentPassword = formData.get('current') as string;
		const newPassword = formData.get('new') as string;

		const id = locals.user?.id ?? '';

		try {
			const user = await findUserById(id);
			const match = await bcrypt.compare(currentPassword, user.password);
			if (!match) {
				throw new Error('Incorrect password');
			}
			user.password = await bcrypt.hash(newPassword, 10);
			await user.save();

			cookies.delete('sessionToken');
			locals.user = null;

			return {
				success: 'Password changed successfully',
			};
		} catch (error) {
			console.error(error);
			return {
				success: false,
				error: 'Incorrect password',
			};
		}

		// cookies.delete('sessionToken');
		// locals.user = null;
	},
} satisfies Actions;
