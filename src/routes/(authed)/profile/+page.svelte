<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import { toProperCase } from '$lib/Utilities/string.js';
	import { enhance } from '$app/forms';

	export let data: PageData;
	export let form: ActionData;
</script>

<svelte:head>
	<title>{data.user.username} profile - FF manager</title>
</svelte:head>

<div class="flex flex-col lg:p-4">
	<h1 class="text-4xl font-bold text-white">Welcome {data.user.username}</h1>
	<p class="pt-2 text-xl text-white">Your UUID is</p>
	<pre>{data.user.id}</pre>
	<p class="pt-2 text-xl text-white">You have the following permissions:</p>
	<pre>{toProperCase(data.user.permissions.join('\n'))}</pre>
	<form use:enhance method="POST" class="w-full pt-4">
		{#if form?.error}
			<p class="text-red-500">{form.error}</p>
		{/if}
		<p class="text-xl font-bold text-white">Change Password</p>
		<div class="md:max-w-xl pb-4">
			<label>
				<span class="py-1 block">Current password</span>
				<input name="current" type="password" />
			</label>
			<label>
				<span class="py-1 block">New Password</span>
				<input name="new" type="password" />
			</label>
		</div>
		<div class="flex w-full gap-2">
			<input type="hidden" name="id" value={data.user.id} />
			<button
				formaction="?/changePassword"
				class="md:max-w-xl w-full p-4 text-xl font-bold text-white bg-blue-500 rounded hover:bg-blue-600 text-center"
			>
				Change Password
			</button>
			<button
				formaction="?/logout"
				class="block ml-auto p-4 text-xl font-bold text-white bg-red-500 rounded hover:bg-red-600 text-center"
			>
				Logout
			</button>
		</div>
	</form>
</div>
