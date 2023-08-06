<script lang="ts">
	import type { PageData } from './$types';
	import Header from '$lib/components/Generic/Header.svelte';
	import MultiButton from '$lib/components/Generic/MultiButton.svelte';
	import SerieContainer from '$lib/components/Series/SerieContainer.svelte';
	import MultipleInput from '$lib/components/Generic/MultipleInput.svelte';
	import { Feather } from 'sveltekit-feather-icons';
	import AdvancedOptions from '$lib/components/Search/AdvancedOptions.svelte';

	export let data: PageData;

	const buttons = [{ text: 'Clear', icon: 'x', href: '/search' }];
	let submitButton: HTMLInputElement;

	const onSearchChange = () => {
		if (submitButton) {
			// we wait for the form to update, else we miss the last input
			setTimeout(() => {
				location.hash = '';
				submitButton.click();
			}, 100);
		}
	};

	let advancedOptions = false;
</script>

<svelte:head>
	<title>Search - FF manager</title>
</svelte:head>

<Header title="Advanced Search">
	<MultiButton {buttons} />
</Header>
<div>
	<form
		data-sveltekit-keepfocus
		data-sveltekit-replacestate
		method="GET"
		class="grid grid-cols-1 sm:grid-cols-2 gap-2"
	>
		<div class="tags">
			<MultipleInput
				onInput={onSearchChange}
				name="Tags"
				suggestions={data.tags}
				valueList={data.selectedTags}
			>
				<Feather icon="tag" classes="h-4 w-4 inline-block text-gray-400" />
			</MultipleInput>
		</div>
		<div class="authors">
			<MultipleInput
				onInput={onSearchChange}
				name="Authors"
				suggestions={data.authors}
				valueList={data.selectedAuthors}
			>
				<Feather icon="user" classes="h-4 w-4 inline-block text-gray-400" />
			</MultipleInput>
		</div>
		<AdvancedOptions onChange={onSearchChange} />
		<input type="submit" class="hidden" bind:this={submitButton} />
	</form>
</div>

<SerieContainer series={data.series} user={data.user} />
