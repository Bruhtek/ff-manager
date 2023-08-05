<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types';
	import MultipleInput from '$lib/components/Generic/MultipleInput.svelte';
	import { Feather } from 'sveltekit-feather-icons';

	export let form: ActionData;

	export let data: PageData;
</script>

<svelte:head>
	<title>Edit Series - FF manager</title>
</svelte:head>

<div class="flex flex-col lg:p-4">
	{#if form?.error}
		<div class="notification error">{form.error}</div>
	{/if}

	<h1 class="font-bold text-4xl text-white">Edit "{data.serie.title}"</h1>
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
			<input type="text" name="title" value={data.serie.title} />
		</label>
		<MultipleInput name="Authors" suggestions={data.authors} valueList={data.serie.authors}>
			<!-- decorator -->
			<Feather icon="user" classes="text-gray-400 inline-block" />
		</MultipleInput>
		<label>
			Summary
			<textarea name="summary">{data.serie.summary}</textarea>
		</label>
		<MultipleInput name="Tags" suggestions={data.tags} valueList={data.serie.tags}>
			<!-- decorator -->
			<Feather icon="hash" classes="h-4 w-4 text-gray-400 inline-block" />
		</MultipleInput>
		<label>
			Protection
			<select name="protection">
				<option value="public" selected={data.serie.protection === 'public'}>
					Public
				</option>
				<option value="protected" selected={data.serie.protection === 'protected'}>
					Protected
				</option>
				<option value="private" selected={data.serie.protection === 'private'}>
					Private
				</option>
			</select>
		</label>
		<button
			formaction="?/save"
			class="ml-auto mt-3 bg-blue-400 text-white py-2 px-3 rounded
				hover:bg-blue-500 transition-colors duration-200 ease-in-out"
		>
			Save
		</button>
		<a href="/series/{data.serie._id}" class="ml-auto mt-3 btn"> Back </a>
		<button
			formaction="?/delete"
			on:click={(e) => {
				if (!confirm('Are you sure you want to delete this serie?')) {
					e.preventDefault();
				}
			}}
			class="ml-auto mt-3 bg-red-400 text-white py-2 px-3 rounded
				hover:bg-red-500 transition-colors duration-200 ease-in-out"
		>
			Delete
		</button>
	</form>
</div>
