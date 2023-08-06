<script lang="ts">
	import type { ISerie } from '$lib/server/database/schemas/SeriesSchema';
	import SerieTag from '$lib/components/Series/SerieTag.svelte';
	import SerieProtectionIcon from '$lib/components/Series/SerieProtectionIcon.svelte';
	import type { User } from '$lib/types/user';
	import SerieBookmark from '$lib/components/Series/SerieBookmark.svelte';
	import SerieButtons from '$lib/components/Series/SerieButtons.svelte';
	import SerieRating from '$lib/components/Series/SerieRating.svelte';

	export let serie: ISerie;
	export let main = false;
	export let user: User | null = null;
	export let backHref = '/series';
</script>

<div class="flex w-full flex-col mb-1 anchor-offset" id={serie._id}>
	<div class="font-bold relative" class:text-xl={!main} class:text-3xl={main}>
		{#if main}
			<SerieButtons {backHref} {serie} {user} />
		{/if}
		<p>
			<SerieBookmark {serie} {user} />
			{serie.title}
			<SerieProtectionIcon protection={serie.protection} />
		</p>
	</div>
	<div class="text-lg text-gray-200">
		{#each serie.authors as author, index}
			<a href="/search?authors={author}" class="hover:underline transition duration-200 mr-1">
				{author}{index < serie.authors.length - 1 ? ', ' : ''}
			</a>
		{/each}
	</div>
</div>

<div class="text-sm text-gray-400 mb-2">
	{#if serie.chapterIds.length === 1}
		{serie.chapterIds.length} chapter
	{:else}
		{serie.chapterIds.length} chapters
	{/if}
</div>

<SerieRating {serie} />

<div class="text-sm">
	{serie.summary}
</div>

<div class="w-full mt-3">
	{#if serie.tags.length <= 20 || main}
		{#each serie.tags as tag}
			<SerieTag tagLight={main} {tag} />
		{/each}
	{:else}
		{#each serie.tags.slice(0, 20) as tag}
			<SerieTag tagLight={main} {tag} />
		{/each}
		<p class="rounded bg-gray-800 inline-flex p-1 mr-1 mb-1 text-gray-300 text-sm">...</p>
	{/if}
</div>
