<script lang="ts">
	import type { AppState } from '$lib/shared/schema/app';
	import type { Writable } from 'svelte/store';
	import TextInput from '../form/TextInput.svelte';

	export let appState: Writable<AppState>;
</script>

<div class="page">
	<h3>Zusammenfassung</h3>

	<TextInput bind:initValue={$appState.name} label="Name" name="name" required />
</div>

<style>
	.page {
		display: grid;
		gap: 1rem;
	}
</style>
