<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types';
	import MultipleInput from '$lib/components/Generic/MultipleInput.svelte';
	import { Feather } from 'sveltekit-feather-icons';
	import type { ChapterData, TextTransformer } from '$lib/importer/main';
	import { browser } from '$app/environment';
	import { removeAttributes } from '$lib/Utilities/text';

	export let data: PageData;
	export let form: ActionData;

	let textTransformers: (TextTransformer & { enabled: boolean })[] =
		data.importer.textTransformers;

	type Chapter = ChapterData & {
		originalContent: string;
	};

	let chapters: Chapter[] = [];
	$: if (chapters.length === 0 && data) {
		if (browser) {
			chapters = data.serieData.chapters.map((c) => ({
				...c,
				originalContent: removeAttributes(c.content, document),
			}));
		} else {
			chapters = data.serieData.chapters.map((c) => ({
				...c,
				originalContent: c.content,
			}));
		}
	}

	const onChapterTransform = () => {
		for (let i = 0; i < chapters.length; i++) {
			chapters[i].content = chapters[i].originalContent;
			for (let transformer of textTransformers) {
				if (transformer.enabled) {
					chapters[i].content = transformer.transformer(chapters[i].content);
				}
			}
		}
	};

	const getChapterJSON = (chapter: Chapter) => {
		return JSON.stringify({
			name: chapter.name,
			summary: chapter.summary,
			content: chapter.content,
			url: chapter.url,
		});
	};
</script>

<svelte:head>
	<title>{data.name} - FF manager</title>
</svelte:head>

<form
	method="POST"
	class="block w-full"
	use:enhance={({ cancel, submitter }) => {
		if (submitter?.id === 'tagInput') {
			cancel();
		}
	}}
>
	{#if form?.error}
		<div class="notification error">{form.error}</div>
	{/if}

	<div class="flex flex-col lg:p-4">
		<label>
			Title
			<input type="text" name="title" bind:value={data.serieData.name} />
		</label>
		<MultipleInput valueList={data.serieData.authors} name="Authors" suggestions={data.authors}>
			<!-- decorator -->
			<Feather icon="user" classes="text-gray-400 inline-block" />
		</MultipleInput>
		<label>
			Summary
			<textarea name="summary">{data.serieData.summary}</textarea>
		</label>
		<MultipleInput valueList={data.serieData.tags} name="Tags" suggestions={data.tags}>
			<!-- decorator -->
			<Feather icon="tag" classes="h-4 w-4 text-gray-400 inline-block" />
		</MultipleInput>
		<label>
			Protection
			<select name="protection">
				<option value="public">Public</option>
				<option value="protected" selected>Protected</option>
				<option value="private">Private</option>
			</select>
		</label>
	</div>

	<hr class="my-2 border-t-2 border-white" />

	<div class="my-4">
		<p class="text-2xl text-gray-300">Transformers:</p>
		<div class="mb-4">
			{#each textTransformers as transformer}
				<label>
					<input
						type="checkbox"
						bind:checked={transformer.enabled}
						on:change={onChapterTransform}
					/>
					{transformer.name}
				</label>
			{/each}
		</div>
	</div>

	<div>
		<p class="text-2xl text-gray-300">Chapters</p>
		{#each chapters as chapter}
			<details>
				<summary>{chapter.name}</summary>

				<div>
					<div class="text-xl text-gray-300">Summary:</div>
					<div class="chapter-summary chapter-summary mb-4 text-sm text-gray-300">
						{chapter.summary}
					</div>
					<div class="text-xl text-gray-300">Content:</div>
					<div class="chapter-content chapter-content text-sm text-gray-300">
						{@html chapter.content}
					</div>
				</div>
			</details>
			<input type="hidden" name="chapter" value={getChapterJSON(chapter)} />
		{/each}
	</div>

	<button
		class="ml-auto mt-3 rounded bg-blue-400 px-3 py-2 text-white
				transition-colors duration-200 ease-in-out hover:bg-blue-500"
	>
		Submit
	</button>
</form>
