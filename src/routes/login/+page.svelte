<script lang="ts">
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';

	export let form: ActionData;
</script>

<svelte:head>
	<title>Login - FF manager</title>
</svelte:head>

<div class="max-w-xl mx-auto">
	{#if form?.missing}
		<div class="notification error">Please fill in all fields.</div>
	{/if}

	{#if form?.invalid}
		<div class="notification error">Invalid username or password.</div>
	{/if}

	<form method="POST" use:enhance action="/login" class="flex flex-col gap-2">
		<label>
			<span>Username</span>
			<input name="username" type="text" />
		</label>
		<label>
			<span>Password</span>
			<input name="password" type="password" />
		</label>
		<button
			class="ml-auto mt-3 bg-blue-400 text-white py-2 px-3 rounded
				hover:bg-blue-500 transition-colors duration-200 ease-in-out
				"
		>
			Log in
		</button>
	</form>
</div>
