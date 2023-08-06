<script lang="ts">
	import { Feather } from 'sveltekit-feather-icons';

	export let buttons: {
		href: string;
		text: string;
		icon: string;
	}[] = [];
</script>

<div class="md:w-max w-full flex gap-2 mt-3 md:mt-0 my-2">
	{#each buttons as btn}
		<a href={btn.href} class="btn text-center flex-grow basis-0 md:basis-auto text-lg">
			<Feather icon={btn.icon} classes="h-8 w-8 inline-block" />
			{btn.text}
		</a>
	{/each}
</div>
