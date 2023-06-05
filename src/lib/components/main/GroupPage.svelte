<script lang="ts">
	import type { AppState } from '$lib/shared/schema/app';
	import type { Writable } from 'svelte/store';
	import TextInput from '../form/TextInput.svelte';

	export let appState: Writable<AppState>;
</script>

<div class="page">
	<h3>Gruppe</h3>
</div>

<style>
	.page {
		display: grid;
		gap: 1rem;
	}
</style>
