<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types';
	import { page } from '$app/stores';

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

	<h1 class="font-bold text-4xl text-white">Upload Chapter</h1>
	<form use:enhance method="POST" class="w-full block">
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
			class="ml-auto mt-3 bg-blue-400 text-white py-2 px-3 rounded
				hover:bg-blue-500 transition-colors duration-200 ease-in-out"
		>
			Save
		</button>
		<a href="/series/{data.serie._id}/{chapter._id}" class="ml-auto mt-3 btn"> Back </a>
		<button
			formaction="?/delete"
			on:click={(e) => {
				if (!confirm('Are you sure you want to delete this chapter?')) {
					e.preventDefault();
				}
			}}
			class="ml-auto mt-3 bg-red-400 text-white py-2 px-3 rounded
				hover:bg-red-500 transition-colors duration-200 ease-in-out"
		>
			Delete
		</button>
	</form>
	<p>Chapter preview</p>
	<div class="chapter-content text-sm text-gray-300">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html chapterContent}
	</div>
</div>
