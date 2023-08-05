<script lang="ts">
	import NavbarLink from './NavbarLink.svelte';
	import type { User } from '$lib/types/user';
	import { Feather } from 'sveltekit-feather-icons';

	export let links: Record<string, string> = {};
	export let user: User | null = null;
</script>

<div class="md:hidden" id="mobile-menu">
	<div class="space-y-1 px-2 pb-3 pt-2 sm:px-3">
		{#each Object.keys(links) as key}
			<NavbarLink block={true} url={links[key]} name={key} />
		{/each}
		<hr />
		{#if user}
			<a
				href="/profile"
				class="px-3 py-2 rounded-md
					font-medium text-white hover:bg-gray-700
					transition-colors duration-200 ease-in-out
					hover:text-gray-100 flex items-stretch"
			>
				<span>{user.username}</span>
				<img
					class="h-6 w-6 rounded-full inline-block ml-auto"
					src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
					alt=""
				/>
			</a>
		{:else}
			<a
				href="/login"
				class="px-3 py-2 rounded-md
					font-medium text-white hover:bg-gray-700
					transition-colors duration-200 ease-in-out
					hover:text-gray-100 flex items-stretch"
			>
				<span>
					Login
					<Feather icon="log-in" classes="h-6 w-6 inline" />
				</span>
			</a>
		{/if}
	</div>
</div>
