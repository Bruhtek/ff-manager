import type { User } from '$lib/types/user';

const checkPermissions = (user: User, permissionToCheck: string) => {
	// If user is admin, return true
	if (user.permissions.includes('admin')) {
		return true;
	}

	const mainPermission = permissionToCheck.split(':')[0] ?? '';
	if (user.permissions.includes(`${mainPermission}:*`)) {
		return true;
	}

	// else just check if user has the permission
	return user.permissions.includes(permissionToCheck);
};

export default checkPermissions;

export const canUserSeeThis = (
	user: User | null,
	protectionLevel: 'public' | 'protected' | 'private',
) => {
	if (!user) {
		return protectionLevel === 'public';
	}
	if (checkPermissions(user, 'view:private')) {
		return true;
	} else {
		return protectionLevel === 'public' || protectionLevel === 'protected';
	}
};
