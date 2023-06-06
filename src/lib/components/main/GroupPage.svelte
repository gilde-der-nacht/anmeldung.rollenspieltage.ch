<script lang="ts">
	import type { AppState } from '$lib/shared/schema/app';
	import type { Writable } from 'svelte/store';
	import TextInput from '../form/TextInput.svelte';
	import Alert from '../common/Alert.svelte';

	export let appState: Writable<AppState>;
</script>

<div class="page">
	<h3>Gruppe</h3>
	<Alert>
		<p>
			Auf dieser Seite hast du die Möglichkeit bis zu zwei weitere Personen anzumelden, die dasselbe
			Programm erhalten werden wie du.
		</p>
		<p>Seid ihr mehr als drei Personen, dann teilt euch bitte in kleinere Gruppen auf.</p>
	</Alert>
</div>

<style>
	.page {
		display: grid;
		gap: 1rem;
	}
</style>
