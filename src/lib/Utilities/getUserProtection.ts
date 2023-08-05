import type { User } from '$lib/types/user';
import checkPermissions from '$lib/Utilities/checkPermissions';

export default (user?: User) => {
	if (!user) {
		return 'public';
	}
	if (checkPermissions(user, 'view:private')) {
		return 'private';
	}
	return 'protected';
};
