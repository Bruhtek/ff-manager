<script lang="ts">
	import type { PageData } from './$types';
	import SerieInfo from '$lib/components/Series/SerieInfo.svelte';
	import { Feather } from 'sveltekit-feather-icons';
	import CardContainer from '$lib/components/Generic/CardContainer.svelte';
	import checkPermissions from '$lib/Utilities/checkPermissions';
	import { browser } from '$app/environment';

	export let data: PageData;

	let previousPage = '/series';

	$: if (browser) {
		const prevCookie = document.cookie
			.split('; ')
			.find((row) => row.startsWith('previousPage='));
		if (prevCookie) {
			previousPage = prevCookie.split('=')[1];
		} else {
			previousPage = '/series';
		}
	}
</script>

<svelte:head>
	<title>{data.serie.title} - FF manager</title>
</svelte:head>

<SerieInfo backHref={previousPage} main={true} serie={data.serie} user={data.user} />
<div class="flex justify-between my-3 align-middle">
	<h3 class="text-2xl font-bold mt-1">Chapters</h3>
	{#if checkPermissions(data.user, 'create:chapters')}
		<a
			href="/series/{data.serie._id}/new-chapter"
			class="flex place-content-center place-items-center bg-blue-500 hover:bg-blue-700
		text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out
		w-max"
		>
			<Feather icon="plus" classes="inline-block h-6 w-6" />
			<span class="mt-1">New chapter</span>
		</a>
	{/if}
</div>
<CardContainer>
	{#each data.chapters as chapter}
		<a class="card-item" href="/series/{data.serie._id}/{chapter._id}">
			<p class="text-xl text-bold">{chapter.title}</p>
			<p class="text-sm">{chapter.summary}</p>
		</a>
	{/each}
</CardContainer>
