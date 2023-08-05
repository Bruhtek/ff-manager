import type { LayoutLoad } from './$types';

export const load = (() => {
	return {
		searchButtons: [
			{
				href: '/series',
				text: 'Clear',
				icon: 'x',
			},
			{
				href: '/search',
				text: 'Advanced',
				icon: 'search',
			},
		],
	};
}) satisfies LayoutLoad;
