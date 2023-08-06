<script lang="ts">
	import type { PageData } from './$types';
	import SerieContainer from '$lib/components/Series/SerieContainer.svelte';
	import checkPermissions from '$lib/Utilities/checkPermissions';
	import MultiButton from '$lib/components/Generic/MultiButton.svelte';
	import Header from '$lib/components/Generic/Header.svelte';

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

<Header title="Series">
	{#if checkPermissions(data.user, 'create:series')}
		<MultiButton {buttons} />
	{/if}
</Header>
<SerieContainer series={data.series} user={data.user} />
