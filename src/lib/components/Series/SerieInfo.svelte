<script lang="ts">
	import type { ISerie } from '$lib/server/database/schemas/SeriesSchema';
	import SerieTag from '$lib/components/Series/SerieTag.svelte';
	import { Feather } from 'sveltekit-feather-icons';
	import SerieProtectionIcon from '$lib/components/Series/SerieProtectionIcon.svelte';
	import type { User } from '$lib/types/user';
	import checkPermissions from '$lib/Utilities/checkPermissions';

	export let serie: ISerie;
	export let main = false;
	export let user: User | null = null;
	export let backHref = '/series';

	const toggleBookmark = async (e: Event) => {
		e.stopPropagation();
		e.preventDefault();

		const res = await fetch(`/api/series/${serie._id}/bookmark`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ bookmark: !user?.bookmarks.includes(serie._id) }),
		});

		const status = await res.json();

		if (res.ok && user) {
			if (status) {
				user.bookmarks = [...user.bookmarks, serie._id];
			} else {
				user.bookmarks = user.bookmarks.filter((id) => id !== serie._id);
			}
		}
	};
</script>

<div class="flex w-full flex-col mb-1 anchor-offset" id={serie._id}>
	<div class="font-bold relative" class:text-xl={!main} class:text-3xl={main}>
		{#if main}
			<div class="w-full sm:w-[unset] sm:absolute top-0 right-0 flex gap-2">
				<a href={backHref} class="btn mb-2 text-center flex-grow">
					<Feather icon="arrow-left" classes="h-8 w-8 mb-1 inline-block" />
					Back
				</a>
				{#if user && checkPermissions(user, 'edit:series')}
					<a href="/series/{serie._id}/edit" class="btn mb-2 text-center flex-grow">
						<Feather icon="edit" classes="h-8 w-8 mb-1 inline-block" />
						Edit
					</a>
				{/if}
			</div>
		{/if}
		<p>
			{#if user}
				{#if user.bookmarks.includes(serie._id)}
					<button on:click={toggleBookmark}>
						<Feather
							icon="bookmark"
							classes="mb-1 inline-block fill-white hover:fill-gray-500 transition duration-200"
						/>
					</button>
				{:else if main}
					<button on:click={toggleBookmark}>
						<Feather
							icon="bookmark"
							classes="mb-1 inline-block fill-gray-500 hover:fill-white transition duration-200"
						/>
					</button>
				{/if}
			{/if}
			{serie.title}
			<SerieProtectionIcon protection={serie.protection} />
		</p>
	</div>
	<div class="text-lg text-gray-200">
		{#each serie.authors as author, index}
			<a href="/search/authors/{author}" class="hover:underline transition duration-200 mr-1">
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
