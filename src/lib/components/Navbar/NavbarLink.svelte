<script lang="ts">
	import { page } from '$app/stores';
	import { toProperCase } from '$lib/Utilities/string';

	export let url = '#';
	export let name = 'Home';

	export let block = false;

	export let onClick: () => never;
</script>

<a
	href={url}
	class="px-3 py-2 rounded-md
		font-medium text-white hover:bg-gray-700
		transition-colors duration-200 ease-in-out
		hover:text-gray-100"
	class:block
	class:text-sm={!block}
	class:bg-gray-900={$page.url.pathname.startsWith(url)}
	on:click={onClick}
>
	{toProperCase(name)}
</a>
