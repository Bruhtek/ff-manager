<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import Header from '$lib/components/Generic/Header.svelte';
	import MultiButton from '$lib/components/Series/MultiButton.svelte';
	import SerieContainer from '$lib/components/Series/SerieContainer.svelte';
	import MultipleInput from '$lib/components/Generic/MultipleInput.svelte';
	import { enhance } from '$app/forms';
	import { Feather } from 'sveltekit-feather-icons';

	export let data: PageData;
	export let form: ActionData;

	const buttons = [{ text: 'Clear', icon: 'x', href: '/search' }];
	let formElement: HTMLFormElement;
	let submitButton: HTMLInputElement;

	const onSeachChange = () => {
		if (submitButton) {
			// we wait for the form to update, else we miss the last input
			setTimeout(() => {
				submitButton.click();
			}, 100);
		}
	};

	let tags: string[] = [];
	let authors: string[] = [];
</script>

<svelte:head>
	<title>Search - FF manager</title>
</svelte:head>

<Header title="Advanced Search">
	{#if form}
		<MultiButton {buttons} />
	{/if}
</Header>
<div>
	<form
		method="POST"
		class="grid grid-cols-2 gap-2"
		use:enhance={() => {
			return async ({ update }) => {
				await update({ reset: false });
			};
		}}
		bind:this={formElement}
	>
		<div class="tags">
			<MultipleInput onInput={onSeachChange} name="Tags" suggestions={data.tags}>
				<Feather icon="tag" classes="h-4 w-4 inline-block text-gray-400" />
			</MultipleInput>
		</div>
		<div class="authors">
			<MultipleInput onInput={onSeachChange} name="Authors" suggestions={data.authors}>
				<Feather icon="user" classes="h-4 w-4 inline-block text-gray-400" />
			</MultipleInput>
		</div>
		<input type="submit" class="hidden" bind:this={submitButton} />
	</form>
</div>
{#if form}
	<SerieContainer series={form.series} />
{:else}
	<SerieContainer series={data.series} />
{/if}
