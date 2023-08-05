<script lang="ts">
	import type { PageData } from './$types';
	import { Feather } from 'sveltekit-feather-icons';
	import SerieContainer from '$lib/components/Series/SerieContainer.svelte';
	import checkPermissions from '$lib/Utilities/checkPermissions';
	import MultiButton from '$lib/components/Series/MultiButton.svelte';

	export let data: PageData;

	const buttons = [
		{
			icon: 'plus',
			text: 'Add serie',
			href: '/series/new',
		},
	];
</script>

<svelte:head>
	<title>Series - FF manager</title>
</svelte:head>

<div class="flex items-stretch justify-between flex-col md:flex-row mb-3">
	<h1 class="inline-grid place-content-center text-4xl text-white">Series page</h1>
	{#if checkPermissions(data.user, 'create:series')}
		<MultiButton {buttons} />
	{/if}
</div>
<SerieContainer series={data.series} />
