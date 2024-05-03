<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types';
	import { page } from '$app/stores';
	import { removeAttributes } from '$lib/Utilities/text';

	export let form: ActionData;

	export let data: PageData;

	$: chapterIndex = data.chapters.findIndex((chapter) => chapter._id === $page.params.chapterId);
	$: chapter = data.chapters[chapterIndex];

	let chapterContent = '';

	$: if (chapter && !chapterContent) {
		chapterContent = chapter.content;
	}
</script>

<svelte:head>
	<title>Edit {chapter.title} - FF manager</title>
</svelte:head>

<div class="flex flex-col lg:p-4">
	{#if form?.error}
		<div class="notification error">{form.error}</div>
	{/if}

	<h1 class="text-4xl font-bold text-white">Upload Chapter</h1>
	<form use:enhance method="POST" class="block w-full">
		<label>
			Title
			<input type="text" name="title" value={chapter.title} />
		</label>
		<label>
			Url
			<input type="url" name="url" value={chapter.url} />
		</label>
		<label>
			Summary
			<textarea name="summary">{chapter.summary}</textarea>
		</label>
		<label>
			Content
			<textarea name="content" bind:value={chapterContent} class="h-40"></textarea>
		</label>
		<button
			formaction="?/save"
			class="ml-auto mt-3 rounded bg-blue-400 px-3 py-2 text-white
				transition-colors duration-200 ease-in-out hover:bg-blue-500"
		>
			Save
		</button>
		<a href="/series/{data.serie._id}/{chapter._id}" class="btn ml-auto mt-3"> Back </a>
		<button
			formaction="?/delete"
			on:click={(e) => {
				if (!confirm('Are you sure you want to delete this chapter?')) {
					e.preventDefault();
				}
			}}
			class="ml-auto mt-3 rounded bg-red-400 px-3 py-2 text-white
				transition-colors duration-200 ease-in-out hover:bg-red-500"
		>
			Delete
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
