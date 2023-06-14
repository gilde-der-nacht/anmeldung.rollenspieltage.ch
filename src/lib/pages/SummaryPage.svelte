<script lang="ts">
	import type { AppState } from '$lib/shared/schema/app';
	import type { Writable } from 'svelte/store';
	import People from '$lib/components/summary/People.svelte';
	import Alert from '$lib/components/common/Alert.svelte';
	import Time from '$lib/components/summary/Time.svelte';

	export let appState: Writable<AppState>;
</script>

<div class="page">
	<h3>Zusammenfassung</h3>
	<Alert
		>Auf dieser Seite findest du die Übersicht über alle deine Angaben. Ausserdem werden alle Punkte
		aufgeführt, die noch zu erledigen sind.
	</Alert>
	<People {appState} />
	<Time {appState} />
</div>

<style>
	.page {
		display: grid;
		gap: 1rem;
	}
</style>
