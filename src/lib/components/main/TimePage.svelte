<script lang="ts">
	import type { AppState } from '$lib/shared/schema/app';
	import type { Writable } from 'svelte/store';
	import Alert from '../common/Alert.svelte';
	import Checkbox from '../form/Checkbox.svelte';
	import TimeTable from '../tables/TimeTable.svelte';

	export let appState: Writable<AppState>;
</script>

<div class="page">
	<h3>Zeit</h3>
	<Alert>
		<p>
			Auf dieser Seite kannst du auswählen, an welchen Tagen und welchen Zeiten du gerne teilnehmen
			möchtest.
		</p>
	</Alert>
	<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
		<Checkbox bind:state={$appState.days.saturday}>Samstag</Checkbox>
		<Checkbox bind:state={$appState.days.sunday}>Sonntag</Checkbox>
	</div>
	<h4>Samstag, 26. August 2023</h4>
	<TimeTable day="SATURDAY" {appState} />
	<h4>Sonntag, 27. August 2023</h4>
	<TimeTable day="SUNDAY" {appState} />
</div>

<style>
	.page {
		display: grid;
		gap: 1rem;
	}
</style>
