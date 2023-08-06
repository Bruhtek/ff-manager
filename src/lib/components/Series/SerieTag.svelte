<script lang="ts">
	import { Feather } from 'sveltekit-feather-icons';

	export let tag: string;
	export let tagLight = false;
</script>

<a
	href="/search?tags={tag}"
	class:bg-gray-800={!tagLight}
	class:bg-gray-700={tagLight}
	class="rounded inline-flex p-1 mr-1 mb-1 transition duration-200 hover:bg-gray-500"
>
	<Feather icon="tag" classes="h-4 w-4 mt-0.5 mr-1 inline-block text-gray-400" />
	<p class="text-gray-300 text-sm">{tag}</p>
</a>
