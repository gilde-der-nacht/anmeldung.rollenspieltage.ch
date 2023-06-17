<script lang="ts">
	import type { AppState } from '$lib/shared/schema/app';
	import type { Writable } from 'svelte/store';
	import People from '$lib/components/summary/People.svelte';
	import Alert from '$lib/components/common/Alert.svelte';
	import Time from '$lib/components/summary/Time.svelte';
	import Play from '$lib/components/summary/Play.svelte';
	import General from '$lib/components/summary/General.svelte';
	import Master from '$lib/components/summary/Master.svelte';
	import Finalize from '$lib/components/summary/Finalize.svelte';
	import type { Progress } from '$lib/shared/schema/enums';
	import { validateState } from '$lib/shared/validation';

	export let appState: Writable<AppState>;
	export let progressState: Writable<Progress>;
	$: v = validateState($appState);
</script>

<div class="page">
	<h3>Zusammenfassung</h3>
	<Finalize {progressState} disabled={v.all} appState={$appState} />
	<Alert
		>Auf dieser Seite findest du die Übersicht über alle deine Angaben. Ausserdem werden alle Punkte
		aufgeführt, die noch zu erledigen sind.
	</Alert>
	<People {appState} />
	<Time {appState} />
	<Play {appState} />
	<Master {appState} />
	<General {appState} />
	<Finalize {progressState} disabled={v.all} appState={$appState} />
</div>

<style>
	.page {
		display: grid;
		gap: 1rem;
	}
</style>
