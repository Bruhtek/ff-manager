<script lang="ts">
	import { Feather } from 'sveltekit-feather-icons';

	let menuOpen = false;
	export const closeMenu = () => (menuOpen = false);
</script>

<div class="relative">
	<button
		class="px-3 py-2 rounded-md
				font-medium text-white hover:bg-gray-700
				transition-colors duration-200 ease-in-out
				hover:text-gray-100 text-sm"
		on:click={() => (menuOpen = !menuOpen)}
	>
		Upload
		<Feather icon="chevron-down" classes="inline-block w-4 h-4 ml-1" />
	</button>
	<div
		class="absolute right-0 z-10 mt-2 w-48 origin-top-right
		rounded-md bg-white py-1 shadow-lg ring-1 ring-black
		ring-opacity-5 focus:outline-none transform ease-out duration-100"
		class:opacity-0={!menuOpen}
		class:scale-95={!menuOpen}
		class:scale-100={menuOpen}
		class:opacity-100={menuOpen}
		class:pointer-events-none={!menuOpen}
		role="menu"
		aria-orientation="vertical"
		aria-labelledby="user-menu-button"
		tabindex="-1"
		on:click={() => (menuOpen = false)}
		on:keydown={(e) => {
			if (e.key === 'Escape') menuOpen = false;
		}}
	>
		<!-- Active: "bg-gray-100", Not Active: "" -->
		<a
			href="/upload-manual"
			class="block px-4 py-2 text-sm text-gray-700"
			role="menuitem"
			tabindex="-1"
			id="user-menu-item-0"
		>
			Manually
		</a>
		<a
			href="/upload-import"
			class="block px-4 py-2 text-sm text-gray-700"
			role="menuitem"
			tabindex="-1"
			id="user-menu-item-1"
		>
			Import
		</a>
	</div>
</div>
