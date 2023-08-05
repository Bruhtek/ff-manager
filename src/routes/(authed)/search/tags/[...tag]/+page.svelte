<script lang="ts">
	import type { PageData } from './$types';
	import { Feather } from 'sveltekit-feather-icons';
	import SerieContainer from '$lib/components/Series/SerieContainer.svelte';
	import MultiButton from '$lib/components/Series/MultiButton.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>Tag: {data.tag} - FF manager</title>
</svelte:head>

<div class="flex items-stretch justify-between flex-col md:flex-row mb-3">
	<h1 class="inline-grid place-content-center text-4xl text-white text-center">
		Search - "{data.tag}"
	</h1>
	<MultiButton buttons={data.searchButtons} />
</div>
<SerieContainer series={data.series} />
