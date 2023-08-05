<script>
	import { page } from '$app/stores';
	import { toProperCase } from '$lib/Utilities/string.ts';

	export let url = '#';
	export let name = 'Home';

	export let block = false;
</script>

<a
	href={url}
	class="px-3 py-2 rounded-md
		font-medium text-white hover:bg-gray-700
		transition-colors duration-200 ease-in-out
		hover:text-gray-100"
	class:block
	class:text-sm={!block}
	class:bg-gray-900={url === $page.url.pathname}
>
	{toProperCase(name)}
</a>
