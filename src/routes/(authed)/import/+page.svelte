<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	let url: string = '';

	const checkUrlMatches = (url: string, supportedURLs: string[]) => {
		return supportedURLs.some((supportedURL) => {
			// * maps to any string, without slashes and question marks (query params)
			const regex = new RegExp(`^${supportedURL.replace(/\*/g, '[^?/]+')}$`);
			return regex.test(url);
		});
	};

	$: selectedImporter = data.importers.find((importer) =>
		checkUrlMatches(url, importer.supportedURLs),
	);
</script>

<svelte:head>
	<title>Import - FF manager</title>
</svelte:head>

<div class="flex flex-col lg:p-4">
	<h1 class="font-bold text-4xl text-white">Import a serie</h1>
	<p class="text-red-400"></p>
	<label>
		Series Url
		<input type="url" name="url" bind:value={url} />
	</label>

	{#if !selectedImporter}
		<div class="flex flex-wrap my-2">
			<p class="w-full">Available importers:</p>
			{#each data.importers as importer, i}
				<div class="flex gap-2">
					<img src={importer.iconUrl} alt="" class="h-6 w-6 inline-block" />
					{importer.fullname}
				</div>
			{/each}
		</div>
	{:else}
		<div class="text-green-400 my-2">
			<p>Matching importer:</p>
			<div class="flex gap-2">
				<img src={selectedImporter.iconUrl} alt="" class="h-6 w-6 inline-block" />
				{selectedImporter.fullname}
			</div>
		</div>

		<a href="/import/{selectedImporter.name}/{url}" class="btn"> Get series info </a>
	{/if}
</div>
