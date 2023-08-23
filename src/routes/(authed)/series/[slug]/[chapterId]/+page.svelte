<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import ReaderChapterButtons from '$lib/components/Series/ReaderChapterButtons.svelte';

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
	<ReaderChapterButtons chapters={data.chapters} {chapterIndex} top={true} serie={data.serie} />
	<div class="chapter-content">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html chapter.content}
	</div>
	<ReaderChapterButtons chapters={data.chapters} {chapterIndex} top={false} serie={data.serie} />
{:else}
	<p>Chapter not found</p>
{/if}
