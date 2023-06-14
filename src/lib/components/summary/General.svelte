<script lang="ts">
	import type { AppState } from '$lib/shared/schema/app';
	import type { Writable } from 'svelte/store';
	import { validateState } from '$lib/shared/validation';
	import Alert from '../common/Alert.svelte';

	export let appState: Writable<AppState>;
	$: v = validateState($appState);
</script>

{#if v.generel}
	<h4>Generell</h4>
	<Alert type="danger">
		Die Anmeldung kann nur abgeschlossen werden, wenn du mindestens eine der folgenden Optionen
		aktiviert hast: Helfen, Spielen oder Spiel Leiten.
	</Alert>
{/if}
