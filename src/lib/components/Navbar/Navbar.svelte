<script lang="ts">
	import NavbarLink from './NavbarLink.svelte';
	import HamburgerShown from './HamburgerShown.svelte';
	import HamburgerHidden from './HamburgerHidden.svelte';
	import MobileMenu from './MobileMenu.svelte';
	import type { User } from '$lib/types/user';
	import { Feather } from 'sveltekit-feather-icons';
	import UploadMenu from '$lib/components/Navbar/UploadMenu.svelte';

	const links: Record<string, string> = {
		home: '/',
		series: '/series',
		search: '/search',
	};

	$: mobileLinks = {
		...links,
		...{ manualUpload: '/upload-manual' },
		...{ import: '/upload-import' },
	};

	let menuOpen = false;

	export let user: User | null;
</script>

<nav class="bg-gray-800">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between">
			<div class="flex items-center">
				<div class="flex-shrink-0">
					<img
						class="h-8 w-8"
						src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
						alt="FF-manager"
					/>
				</div>
				<!-- Links -->
				<div class="hidden md:block">
					<div class="ml-10 flex items-baseline space-x-4">
						{#each Object.keys(links) as key}
							<NavbarLink url={links[key]} name={key} />
						{/each}
						<UploadMenu />
					</div>
				</div>
			</div>
			<div class="hidden md:block text-white">
				<div class="relative ml-3">
					<div>
						{#if user}
							<a
								href="/profile"
								class="relative flex p-1 max-w-xs items-center rounded-full bg-gray-800 text-sm
								focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2
								focus:ring-offset-gray-800 hover:bg-gray-700 transition ease-in-out duration-300"
							>
								<span class="pr-3 pl-1">{user.username}</span>
								<img
									class="h-8 w-8 rounded-full"
									src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
									alt=""
								/>
							</a>
						{:else}
							<a
								href="/login"
								class="h-10 relative flex p-1 max-w-xs items-center rounded-full bg-gray-800
								text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2
								focus:ring-offset-gray-800 hover:bg-gray-700 transition ease-in-out duration-300"
							>
								<span class="pr-3 pl-1">
									Login
									<Feather icon="log-in" classes="h-6 w-6 inline" />
								</span>
							</a>
						{/if}
					</div>
				</div>
			</div>
			<div class="-mr-2 flex md:hidden">
				<button
					type="button"
					class="relative inline-flex items-center justify-center
						rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700
						hover:text-white focus:outline-none focus:ring-2 focus:ring-white
						focus:ring-offset-2 focus:ring-offset-gray-800"
					on:click={() => (menuOpen = !menuOpen)}
				>
					<span class="absolute -inset-0.5"></span>
					<span class="sr-only">Open main menu</span>
					{#if menuOpen}
						<HamburgerShown />
					{:else}
						<HamburgerHidden />
					{/if}
				</button>
			</div>
		</div>
	</div>
	{#if menuOpen}
		<MobileMenu {user} links={mobileLinks} />
	{/if}
</nav>
