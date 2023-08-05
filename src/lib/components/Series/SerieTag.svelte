<script lang="ts">
	export let tag: string;
	export let tagLight = false;
</script>

<a
	href="/search/tags/{tag}"
	class:bg-gray-800={!tagLight}
	class:bg-gray-700={tagLight}
	class="rounded inline-flex p-1 mr-1 mb-1 transition duration-200 hover:bg-gray-500"
>
	<p class="text-gray-500 text-sm mr-1 select-none">#</p>
	<p class="text-gray-300 text-sm">{tag}</p>
</a>
