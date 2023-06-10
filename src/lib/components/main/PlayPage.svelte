<script lang="ts">
	import type { AppState } from '$lib/shared/schema/app';
	import type { Writable } from 'svelte/store';
	import Alert from '../common/Alert.svelte';
	import Checkbox from '../form/Checkbox.svelte';

	export let appState: Writable<AppState>;
</script>

<div class="page">
	<h3>Spielen</h3>
	<Alert>
		<p>
			Auf dieser Seite kannst du auswählen, ob du als Spieler:in teilnehmen möchtest und einige
			Einstellungen vornehmen.
		</p>
	</Alert>
	<div class="checkbox-list">
		<Checkbox bind:state={$appState.wants_to_help} disabled={!$appState.group.two.active}
			>Samstag</Checkbox
		>
	</div>
</div>

<style>
	.page {
		display: grid;
		gap: 1rem;
	}
</style>
