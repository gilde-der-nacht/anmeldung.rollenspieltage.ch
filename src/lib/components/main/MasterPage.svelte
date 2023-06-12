<script lang="ts">
	import type { AppState } from '$lib/shared/schema/app';
	import type { Writable } from 'svelte/store';
	import Alert from '../common/Alert.svelte';
	import Checkbox from '../form/Checkbox.svelte';
	import GameRoundList from '../rounds/GameRoundList.svelte';
	import AddNewGameRound from '../rounds/AddNewGameRound.svelte';
	import type { GameRound } from '$lib/shared/schema/complex/gameRoundSchema';

	export let appState: Writable<AppState>;

	const saveNewRound = (gr: GameRound) => {
		appState.update((prev) => {
			const game_rounds = prev.game_rounds ?? [];
			return { ...prev, game_rounds: [...game_rounds, gr] };
		});
	};

	const saveExistingRound = (gr: GameRound) => {
		console.log('new saved');
	};
</script>

<div class="page">
	<h3>Spiel Leiten</h3>
	<Alert>
		<p>
			Auf dieser Seite kannst du auswählen, ob du als Spielleiter:in teilnehmen möchtest und deine
			Spielrunden erfassen.
		</p>
	</Alert>
	<div class="checkbox-list">
		<Checkbox bind:state={$appState.wants_to_master}>
			Ich möchte gerne als Spielleiter:in teilnehmen.
		</Checkbox>
	</div>
	<h4 style="margin-top: .5rem;">Deine Spielrunden</h4>
	{#if $appState.wants_to_master}
		<AddNewGameRound {saveNewRound} />
		<GameRoundList {appState} {saveExistingRound} />
	{:else}
		<Alert>'Spiel Leiten' wurde nicht ausgewählt.</Alert>
	{/if}
</div>

<style>
	.page {
		display: grid;
		gap: 1rem;
	}
</style>
