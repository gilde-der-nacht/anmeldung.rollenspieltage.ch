<script lang="ts">
	import type { AppState } from '$lib/shared/schema/app';
	import type { Writable } from 'svelte/store';
	import TextInput from '../form/TextInput.svelte';
	import { isNonEmptyString } from '../form/Validation';
	import Checkbox from '../form/Checkbox.svelte';

	export let appState: Writable<AppState>;
</script>

<div class="page">
	<h3>Kontaktperson</h3>

	<TextInput
		bind:initValue={$appState.name}
		label="Name"
		name="name"
		required
		error={{
			condition: () => !isNonEmptyString($appState.name),
			message: '"Name" darf nicht leer sein.',
		}}
	/>

	<TextInput
		bind:initValue={$appState.email}
		label="E-Mail"
		name="email"
		required
		error={{
			condition: () => !isNonEmptyString($appState.email),
			message: '"E-Mail" darf nicht leer sein.',
		}}
	/>

	<h4>Helfen</h4>
	<Checkbox bind:state={$appState.wants_to_help}>
		Ich bin bereit bei einer Spiellücke maximal 2 Stunden an der Kiosk-Kasse auszuhelfen.
	</Checkbox>
</div>

<style>
	.page {
		display: grid;
		gap: 1rem;
	}
</style>
