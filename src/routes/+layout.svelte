<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/Navbar/Navbar.svelte';

	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<div class="bg-gray-900 min-h-screen">
	<Navbar user={data.user} />
	<div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
		<slot />
	</div>
</div>
