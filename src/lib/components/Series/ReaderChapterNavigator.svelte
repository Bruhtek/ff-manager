<script lang="ts">
	import { Feather } from 'sveltekit-feather-icons';
	import type { ISerie } from '$lib/server/database/schemas/SeriesSchema';
	import type { IChapter } from '$lib/server/database/schemas/ChapterSchema';

	export let serie: ISerie;
	export let chapter: IChapter;

	export let top = true;
</script>

<div class="flex flex-col sm:flex-row justify-between sm:justify-center align-middle mb-3 gap-3">
	<p class="inline-grid place-content-center" class:hidden={!top} class:sm:inline-grid={!top}>
		{serie.title} - {chapter.title}
	</p>
	<div class="flex flex-grow sm:justify-end gap-2">
		<a
			href="/series/{serie._id}"
			class="btn h-10 text-center flex-grow sm:flex-grow-0 basis-0 sm:basis-auto"
		>
			<Feather icon="arrow-up" classes="inline-block" />
			Back to series
		</a>
		<a
			href="/series/{serie._id}/{chapter._id}/edit"
			class="btn h-10 text-center flex-grow sm:flex-grow-0 basis-0 sm:basis-auto"
		>
			<Feather icon="edit" classes="inline-block" />
			Edit
		</a>
	</div>
	{#if !top}
		<p class="inline-grid place-content-center sm:hidden">{serie.title} - {chapter.title}</p>
	{/if}
</div>
