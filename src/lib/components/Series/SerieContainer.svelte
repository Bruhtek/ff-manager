<script lang="ts">
	import type { ISerie } from '$lib/server/database/schemas/SeriesSchema';
	import SerieInfo from '$lib/components/Series/SerieInfo.svelte';
	import CardContainer from '$lib/components/Generic/CardContainer.svelte';
	import type { User } from '$lib/types/user';

	export let series: ISerie[];

	export let user: User | null = null;
</script>

<h3 class="w-full text-xl text-gray-400">Found {series.length} series</h3>
<CardContainer>
	{#each series as serie}
		<a href="/series/{serie._id}" class="card-item">
			<SerieInfo {serie} {user} />
		</a>
	{/each}
</CardContainer>
