<script lang="ts">
	import { browser } from '$app/environment';
	import { beforeNavigate } from '$app/navigation';
	import type { BeforeNavigate } from '@sveltejs/kit';

	// if navigating to a series, store the "from" path in a cookie
	// we are only interested in navigation from '/series' or '/search*' to a specific series ('/series/:slug')
	beforeNavigate((navigation: BeforeNavigate) => {
		if (!navigation || !navigation.from || !navigation.to || !browser) {
			return;
		}

		const from = navigation.from.url.pathname;
		const to = navigation.to.url.pathname;

		if (from !== '/series' && !from.startsWith('/search')) {
			return;
		}

		if (!to.startsWith('/series/')) {
			return;
		}

		let selectedSeries = '';
		if (navigation.from.url.searchParams) {
			selectedSeries += '?' + navigation.from.url.searchParams.toString();
		}
		if (to.startsWith('/series/')) {
			selectedSeries += '#' + to.replace('/series/', '');
		}

		// history.replaceState({}, '', from + selectedSeries);
		const cookieAge = 60 * 60 * 24; // 1 day
		document.cookie = `previousPage=${from}${selectedSeries}; path=/; max-age=${cookieAge}`;

		return from + selectedSeries;
	});
</script>

<div class="max-w-7xl rounded bg-gray-800 text-white p-2 md:p-4">
	<slot />
</div>
