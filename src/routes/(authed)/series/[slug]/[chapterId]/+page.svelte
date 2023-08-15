<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import ReaderChapterControl from '$lib/components/Series/ReaderChapterControl.svelte';
	import { Feather } from 'sveltekit-feather-icons';

	export let data: PageData;

	$: chapterIndex = data.chapters.findIndex((chapter) => chapter._id === $page.params.chapterId);
	$: chapter = data.chapters[chapterIndex];
</script>

<svelte:head>
	{#if chapter}
		<title>{chapter.title} - {data.serie.title} - FF-manager</title>
	{:else}
		<title>Chapter not found - FF-manager</title>
	{/if}
</svelte:head>

{#if chapter}
	<div
		class="w-full flex flex-col sm:flex-row justify-between sm:justify-center align-middle mb-3 gap-3"
	>
		<p class="inline-grid place-content-center">{data.serie.title} - {chapter.title}</p>
		<div class="flex flex-grow sm:justify-end gap-2">
			<a
				href="/series/{data.serie._id}"
				class="btn h-10 text-center flex-grow sm:flex-grow-0 basis-0 sm:basis-auto"
			>
				<Feather icon="arrow-up" classes="inline-block" />
				Back to series
			</a>
			<a
				href="/series/{data.serie._id}/{chapter._id}/edit"
				class="btn h-10 text-center flex-grow sm:flex-grow-0 basis-0 sm:basis-auto"
			>
				<Feather icon="edit" classes="inline-block" />
				Edit
			</a>
		</div>
	</div>
	<ReaderChapterControl chapters={data.chapters} {chapterIndex} />
	<div class="chapter-content">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html chapter.content}
	</div>
	<ReaderChapterControl chapters={data.chapters} {chapterIndex} />
{:else}
	<p>Chapter not found</p>
{/if}
