<script lang="ts">
	export let title = '';
</script>

<div class="flex items-stretch justify-between flex-col md:flex-row mb-3">
	<h1 class="inline-grid place-content-center text-4xl text-white">{title}</h1>
	<slot />
</div>
