<script lang="ts">
	export let valueList: string[] = [];
	export let valueInput = '';
	export let suggestions: string[] = [];
	export let name = 'values';

	let selectedSuggestionIndex = -1;

	export let onInput: () => void = () => {
		// do nothing
	};

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Backspace' && valueInput === '') {
			valueList = valueList.slice(0, -1);
			onInput();
			return;
		}
		if (e.key === ',' || e.key === 'Enter' || e.key === 'ArrowDown' || e.key === 'ArrowUp') {
			e.preventDefault();
			e.stopPropagation();
		}

		if (e.key === 'ArrowDown') {
			selectedSuggestionIndex = (selectedSuggestionIndex + 1) % matchingValues.length;
			return;
		}
		if (e.key === 'ArrowUp') {
			selectedSuggestionIndex =
				(selectedSuggestionIndex - 1 + matchingValues.length) % matchingValues.length;
			return;
		}
		if (e.key === 'Enter' && selectedSuggestionIndex >= 0) {
			valueInput = matchingValues[selectedSuggestionIndex];
			selectedSuggestionIndex = -1;
		}

		if ((e.key !== 'Enter' && e.key !== ',') || !valueInput) {
			return;
		}

		let newValue = valueInput.trim();
		let existingValue = suggestions.find(
			(value) => value.toLowerCase() === newValue.toLowerCase(),
		);
		if (existingValue) {
			newValue = existingValue;
		}

		handleAddItem(newValue);
	};

	const handleAddItem = (item: string) => {
		valueList = [...valueList, item];
		// filter for duplicates
		valueList = valueList.filter(
			(value, index) => valueList.indexOf(value) === index && value !== '',
		);
		valueInput = '';
		selectedSuggestionIndex = -1;
		onInput();
	};

	$: possibleValues = suggestions.filter((value) =>
		value.toLowerCase().includes(valueInput.toLowerCase()),
	);
	// prioritize values that start with the input
	$: matchingValues = [
		...possibleValues.filter((value) =>
			value.toLowerCase().startsWith(valueInput.toLowerCase()),
		),
		...possibleValues.filter(
			(value) => !value.toLowerCase().startsWith(valueInput.toLowerCase()),
		),
	].slice(0, 5);
	// when matching values change, reset the selected suggestion
	$: matchingValues, (selectedSuggestionIndex = -1);

	const deleteValue = (value: string) => {
		valueList = valueList.filter((v) => v !== value);
		onInput();
	};
</script>

<div class="relative">
	<label>
		{name}
		<input
			type="text"
			name=""
			id="tagInput"
			autocomplete="off"
			bind:value={valueInput}
			on:keydown={handleKeyDown}
		/>
	</label>
	{#if valueInput && matchingValues.length > 0}
		<div
			class="absolute bottom-0 left-0 w-full bg-gray-900 transform translate-y-full shadow-xl rounded p-1 z-10"
		>
			{#each matchingValues as value, index}
				<button
					class:bg-blue-400={index === selectedSuggestionIndex}
					on:click={() => {
						valueInput = value;
						selectedSuggestionIndex = -1;
						handleAddItem(value);
					}}
					class="block rounded p-0.5 w-full text-left hover:bg-blue-400 transition duration-200"
				>
					{value}
				</button>
			{/each}
		</div>
	{/if}
</div>
<div class="flex flex-wrap gap-1 my-1">
	{#each valueList as value}
		<label
			class="cursor-not-allowed p-1 bg-gray-600
					transition duration-200
					hover:bg-gray-700 rounded select-none
					sm:text-sm"
		>
			<slot />
			{value}
			<input
				on:change={() => deleteValue(value)}
				type="checkbox"
				name={name.toLowerCase()}
				{value}
				checked
				class="hidden"
			/>
		</label>
	{/each}
</div>
