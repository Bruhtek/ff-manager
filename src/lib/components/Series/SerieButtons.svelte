<script lang="ts">
	import checkPermissions from '$lib/Utilities/checkPermissions.js';
	import { Feather } from 'sveltekit-feather-icons';
	import type { ISerie } from '$lib/server/database/schemas/SeriesSchema';
	import type { User } from '$lib/types/user';

	export let backHref = '/series';
	export let serie: ISerie;
	export let user: User | null;
</script>

<div class="w-full sm:w-[unset] sm:absolute top-0 right-0 flex gap-2">
	<a href={backHref} class="btn mb-2 text-center flex-grow">
		<Feather icon="arrow-left" classes="h-8 w-8 mb-1 inline-block" />
		Back
	</a>
	{#if user && checkPermissions(user, 'edit:series')}
		<a href="/series/{serie._id}/edit" class="btn mb-2 text-center flex-grow">
			<Feather icon="edit" classes="h-8 w-8 mb-1 inline-block" />
			Edit
		</a>
	{/if}
</div>
