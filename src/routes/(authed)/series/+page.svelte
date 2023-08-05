<script lang="ts">
	import type { PageData } from './$types';
	import { Feather } from 'sveltekit-feather-icons';
	import SerieContainer from '$lib/components/Series/SerieContainer.svelte';
	import checkPermissions from '$lib/Utilities/checkPermissions';

	export let data: PageData;
</script>

<svelte:head>
	<title>Series - FF manager</title>
</svelte:head>

<div class="flex items-stretch justify-between flex-col md:flex-row mb-3">
	<h1 class="inline-grid place-content-center text-4xl text-white">Series page</h1>
	{#if checkPermissions(data.user, 'create:series')}
		<a
			href="/series/new"
			class="flex place-content-center place-items-center bg-blue-500 hover:bg-blue-700
		text-white font-bold py-2 px-4 rounded my-2 transition duration-200 ease-in-out
		w-full md:w-max mt-3 md:mt-0"
		>
			<Feather icon="plus" classes="inline-block h-8 w-8" />
			<span class="text-lg">New series</span>
		</a>
	{/if}
</div>
<SerieContainer series={data.series} />
