<script lang="ts">
	import type { PageData } from './$types';
	import SerieContainer from '$lib/components/Series/SerieContainer.svelte';
	import MultiButton from '$lib/components/Series/MultiButton.svelte';
	import Header from '$lib/components/Generic/Header.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>Author: {data.author} - FF manager</title>
</svelte:head>

<Header title="Author - {data.author}">
	<MultiButton buttons={data.searchButtons} />
</Header>
<SerieContainer series={data.series} user={data.user} />
