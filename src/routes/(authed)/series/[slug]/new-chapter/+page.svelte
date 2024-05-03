<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import { removeAttributes } from '$lib/Utilities/text';

	export let form: ActionData;

	let chapterContent = '';
</script>

<svelte:head>
	<title>Upload Chapter - FF manager</title>
</svelte:head>

<div class="flex flex-col lg:p-4">
	{#if form?.error}
		<div class="notification error">{form.error}</div>
	{/if}

	{#if form?.success}
		<div class="notification success">{form.success}</div>
	{/if}
	<h1 class="text-4xl font-bold text-white">Upload Chapter</h1>
	<form use:enhance method="POST" class="block w-full">
		<label>
			Title
			<input type="text" name="title" />
		</label>
		<label>
			Url
			<input type="url" name="url" />
		</label>
		<label>
			Summary
			<textarea name="summary"></textarea>
		</label>
		<label>
			Content
			<textarea name="content" bind:value={chapterContent} class="h-40"></textarea>
		</label>
		<button
			class="ml-auto mt-3 rounded bg-blue-400 px-3 py-2 text-white
				transition-colors duration-200 ease-in-out hover:bg-blue-500"
		>
			Submit
		</button>
		<button
			type="button"
			class="ml-auto mt-3 rounded bg-green-400 px-3 py-2 text-white transition-colors
			duration-200 ease-in-out hover:bg-green-500"
			on:click={() => {
				chapterContent = removeAttributes(chapterContent, document);
			}}
		>
			Clean-Up
		</button>
	</form>
	<p>Chapter preview</p>
	<div class="chapter-content text-sm text-gray-300">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html chapterContent}
	</div>
</div>
