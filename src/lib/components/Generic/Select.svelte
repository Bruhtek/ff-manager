<script lang="ts">
	import { toProperCase } from '$lib/Utilities/string';
	import { page } from '$app/stores';

	export let name: string;
	export let options: Record<string, string>;

	export let onChange: () => unknown;

	const selectedOption = $page.url.searchParams.get(name);
</script>

<label class="flex flex-row">
	<span class="inline-grid place-content-center text-center text-xl px-4"
		>{toProperCase(name)}:</span
	>
	<select class="inline-block" {name} on:change={onChange}>
		{#each Object.keys(options) as option}
			<option value={option} selected={option === selectedOption}>
				{options[option]}
			</option>
		{/each}
	</select>
</label>
