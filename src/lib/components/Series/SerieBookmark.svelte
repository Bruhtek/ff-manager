<script lang="ts">
	import type { User } from '$lib/types/user';
	import type { ISerie } from '$lib/server/database/schemas/SeriesSchema';
	import { Feather } from 'sveltekit-feather-icons';

	export let user: User | null;
	export let serie: ISerie;

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

{#if user}
	{#if user.bookmarks.includes(serie._id)}
		<button on:click={toggleBookmark}>
			<Feather
				icon="bookmark"
				classes="mb-1 inline-block fill-white hover:fill-gray-500 transition duration-200"
			/>
		</button>
	{:else}
		<button on:click={toggleBookmark}>
			<Feather
				icon="bookmark"
				classes="mb-1 inline-block fill-none hover:fill-gray-500 transition duration-200"
			/>
		</button>
	{/if}
{/if}
