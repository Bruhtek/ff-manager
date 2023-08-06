<script lang="ts">
	import type { ISerie } from '$lib/server/database/schemas/SeriesSchema';
	import { Feather } from 'sveltekit-feather-icons';
	import { invalidateAll } from '$app/navigation';

	export let serie: ISerie;

	const rate = async (rating: number, e: MouseEvent) => {
		e.preventDefault();

		const res = await fetch(`/api/series/${serie._id}/rate`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ rating }),
		});

		if (res.ok) {
			serie.rating = await res.json();
			console.log(serie.rating);
			await invalidateAll();
		}
	};

	let hoveredCount = 0;
</script>

<div class="flex mb-2">
	{#each Array(5) as _, i}
		<button
			on:click={(e) => rate(i + 1, e)}
			on:mouseover={() => (hoveredCount = i + 1)}
			on:mouseleave={() => (hoveredCount = 0)}
			on:focus={() => (hoveredCount = i + 1)}
			on:blur={() => (hoveredCount = 0)}
		>
			{#if serie.rating}
				<Feather
					icon="star"
					classes="w-6 h-6
						{i < serie.rating ? 'fill-white ' : 'stroke-white'}
						{i < hoveredCount ? 'fill-gray-500 ' : ''}
						{hoveredCount > 0 && i >= hoveredCount ? 'fill-none ' : ''}
						transition-colors duration-200"
				/>
			{:else}
				<Feather
					icon="star"
					classes="
						w-6 h-6 stroke-gray-500
						{i < hoveredCount ? 'fill-gray-500 ' : ''}
						{hoveredCount > 0 && i >= hoveredCount ? 'fill-none ' : ''}"
				/>
			{/if}
		</button>
	{/each}
</div>
