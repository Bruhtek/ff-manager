<script lang="ts">
	import type { ISerie } from '$lib/server/database/schemas/SeriesSchema';
	import SerieInfo from '$lib/components/Series/SerieInfo.svelte';
	import CardContainer from '$lib/components/Generic/CardContainer.svelte';

	export let series: ISerie[];
</script>

<h3 class="w-full text-xl text-gray-400">Found {series.length} series</h3>
<CardContainer>
	{#each series as serie}
		<a href="/series/{serie._id}" class="card-item">
			<SerieInfo {serie} />
		</a>
	{/each}
</CardContainer>
