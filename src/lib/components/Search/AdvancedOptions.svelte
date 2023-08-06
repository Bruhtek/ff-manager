<script lang="ts">
	import Checkbox from '$lib/components/Generic/Checkbox.svelte';
	import Select from '$lib/components/Generic/Select.svelte';

	let advancedOptions = true;

	export let onChange: () => unknown;

	const toggleAdvanced = () => {
		advancedOptions = !advancedOptions;
		location.hash = '';
	};

	const sortOptions = {
		dateAsc: 'Date (oldest first)',
		dateDesc: 'Date (newest first)',
		nameAsc: 'Name (A-Z)',
		nameDesc: 'Name (Z-A)',
		ratingAsc: 'Rating (lowest first)',
		ratingDesc: 'Rating (highest first)',
	};

	const ratingOptions = {
		// we set the actual value one lower than the key, since stars are 0-indexed
		'1': 'Any',
		'2': '2+ stars',
		'3': '3+ stars',
		'4': '4+ stars',
		'5': '5+ stars',
	};
</script>

<div class="col-span-2">
	<button
		class="btn w-full transition duration-300 ease-linear"
		on:click={toggleAdvanced}
		class:rounded-b-none={advancedOptions}
	>
		Toggle advanced options
	</button>
	<div
		class="col-span-2 overflow-hidden transition-all duration-300
		ease-linear border-gray-600 border-4 border-t-0 rounded-b"
		class:border-0={!advancedOptions}
		class:p-2={advancedOptions}
		class:p-0={!advancedOptions}
		class:max-h-0={!advancedOptions}
		class:max-h-60={advancedOptions}
	>
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
			<Checkbox {onChange} name="onlyBookmarked" />
			<Select {onChange} name="sort" options={sortOptions} />
			<Select {onChange} name="rating" options={ratingOptions} />
		</div>
	</div>
</div>
