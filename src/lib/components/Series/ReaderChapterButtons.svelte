<script lang="ts">
	import type { ISerie } from '$lib/server/database/schemas/SeriesSchema';
	import type { IChapter } from '$lib/server/database/schemas/ChapterSchema';
	import ReaderChapterControl from '$lib/components/Series/ReaderChapterControl.svelte';
	import ReaderChapterNavigator from '$lib/components/Series/ReaderChapterNavigator.svelte';

	export let top = true;

	export let serie: ISerie;
	export let chapters: IChapter[];
	export let chapterIndex: number;

	$: chapter = chapters[chapterIndex];
</script>

{#if top}
	<ReaderChapterNavigator {top} {serie} {chapter} />
	<ReaderChapterControl {chapters} {chapterIndex} />
{:else}
	<ReaderChapterControl {chapters} {chapterIndex} />
	<ReaderChapterNavigator {top} {serie} {chapter} />
{/if}
