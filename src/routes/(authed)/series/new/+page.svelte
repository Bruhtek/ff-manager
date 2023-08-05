<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types';
	import MultipleInput from '$lib/components/Generic/MultipleInput.svelte';
	import { Feather } from 'sveltekit-feather-icons';

	export let form: ActionData;

	export let data: PageData;
</script>

<svelte:head>
	<title>New Series - FF manager</title>
</svelte:head>

<div class="flex flex-col lg:p-4">
	{#if form?.error}
		<div class="notification error">{form.error}</div>
	{/if}

	{#if form?.success}
		<div class="notification success">{form.success}</div>
	{/if}
	<h1 class="font-bold text-4xl text-white">New Serie</h1>
	<form
		method="POST"
		class="w-full block"
		use:enhance={({ cancel, submitter }) => {
			if (submitter?.id === 'tagInput') {
				cancel();
			}
		}}
	>
		<label>
			Title
			<input type="text" name="title" />
		</label>
		<MultipleInput name="Authors" suggestions={data.authors}>
			<!-- decorator -->
			<Feather icon="user" classes="text-gray-400 inline-block" />
		</MultipleInput>
		<label>
			Summary
			<textarea name="summary"></textarea>
		</label>
		<MultipleInput name="Tags" suggestions={data.tags}>
			<!-- decorator -->
			<Feather icon="hash" classes="h-4 w-4 text-gray-400 inline-block" />
		</MultipleInput>
		<label>
			Protection
			<select name="protection">
				<option value="public">Public</option>
				<option value="protected" selected>Protected</option>
				<option value="private">Private</option>
			</select>
		</label>
		<button
			class="ml-auto mt-3 bg-blue-400 text-white py-2 px-3 rounded
				hover:bg-blue-500 transition-colors duration-200 ease-in-out"
		>
			Submit
		</button>
	</form>
</div>
