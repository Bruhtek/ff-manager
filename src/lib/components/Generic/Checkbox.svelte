<script lang="ts">
	import { toProperCase } from '$lib/Utilities/string';
	import { Feather } from 'sveltekit-feather-icons';
	import { page } from '$app/stores';

	export let name: string;

	export let onChange: () => unknown;

	const checked = $page.url.searchParams.get(name) === 'true';
</script>

<label class="btn text-center relative select-none">
	<input type="checkbox" on:change={onChange} {name} value="true" class="hidden peer" {checked} />
	<span
		class="opacity-0 peer-checked:opacity-100 -rotate-90 peer-checked:rotate-0 transition duration-200 absolute left-3"
	>
		<span class="grid w-6 h-6 bg-blue-500 rounded-full place-content-center">
			<Feather icon="check" classes="w-5 h-5 text-white" />
		</span>
	</span>
	<span class="opacity-100 peer-checked:opacity-0 transition duration-200 absolute left-3">
		<span class="block w-6 h-6 bg-gray-900 rounded-full"></span>
	</span>
	{toProperCase(name)}
</label>
