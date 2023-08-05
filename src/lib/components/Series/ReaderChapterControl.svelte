<script lang="ts">
	import type { IChapter } from '$lib/server/database/schemas/ChapterSchema';
	import { Feather } from 'sveltekit-feather-icons';

	export let chapterIndex: number;
	export let chapters: IChapter[];
</script>

<div class="w-full flex justify-between mb-3">
	{#if chapterIndex > 0}
		<a href={chapters[chapterIndex - 1]._id} class="btn h-10">
			<Feather icon="arrow-left" classes="inline-block" />
			Previous
		</a>
	{:else}
		<a href="##" class="btn disabled h-10">
			<Feather icon="arrow-left" classes="inline-block" />
			Previous
		</a>
	{/if}
	<div class="grid place-content-center">
		Chapter {chapterIndex + 1} / {chapters.length}
	</div>
	{#if chapters[chapterIndex + 1]}
		<a href={chapters[chapterIndex + 1]._id} class="btn h-10">
			Next
			<Feather icon="arrow-right" classes="inline-block" />
		</a>
	{:else}
		<a href="##" class="btn disabled h-10">
			Next
			<Feather icon="arrow-right" classes="inline-block" />
		</a>
	{/if}
</div>
