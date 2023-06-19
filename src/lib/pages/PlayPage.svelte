<script lang="ts">
	import type { AppState } from '$lib/shared/schema/app';
	import Alert from '$lib/components/common/Alert.svelte';
	import Checkbox from '$lib/components/form/Checkbox.svelte';
	import RadioGroup from '$lib/components/form/RadioGroup.svelte';
	import { createGenresStore, localizeGenre } from '$lib/shared/stores/genres';
	import type { Writable } from 'svelte/store';
	import { validateState } from '$lib/shared/validation';
	import { gameLength2Options } from '$lib/shared/stores/misc';

	export let appState: Writable<AppState>;
	const genres = createGenresStore(appState);

	$: v = validateState($appState);
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
		<Checkbox bind:state={$appState.wants_to_play}>
			Ich möchte gerne als Spieler:in teilnehmen.
		</Checkbox>
	</div>
	{#if $appState.wants_to_play}
		<h4 style="margin-top: .5rem;">Vorlieben</h4>
		<RadioGroup
			label="Bevorzugst du eher kurze oder lange Spielrunden?"
			bind:value={$appState.preferred_game_length}
			disabled={!$appState.wants_to_play}
			options={gameLength2Options}
		/>
		<fieldset>
			<legend>Genres</legend>
			<p style="margin-bottom: .5rem;">
				<em>
					Bitte wähle die Genres aus, die du magst.
					<br />
					Wir versuchen dies bei der Programmerstellung so gut es geht zu berücksichtigen.
				</em>
			</p>
			<div class="checkbox-list">
				<Checkbox bind:state={$genres.fantasy} disabled={!$appState.wants_to_play}
					>{localizeGenre['fantasy']}</Checkbox
				>
				<Checkbox bind:state={$genres.science_fiction} disabled={!$appState.wants_to_play}
					>{localizeGenre['science_fiction']}</Checkbox
				>
				<Checkbox bind:state={$genres.horror} disabled={!$appState.wants_to_play}
					>{localizeGenre['horror']}</Checkbox
				>
				<Checkbox bind:state={$genres.crime} disabled={!$appState.wants_to_play}
					>{localizeGenre['crime']}</Checkbox
				>
				<Checkbox bind:state={$genres.modern} disabled={!$appState.wants_to_play}
					>{localizeGenre['modern']}</Checkbox
				>
			</div>
		</fieldset>
	{:else}
		<Alert>'Spielen' wurde nicht ausgewählt.</Alert>
	{/if}

	{#if v.genres}
		<Alert type="danger">Wähle bitte mindestens ein Genre aus.</Alert>
	{/if}
</div>

<style>
	.page {
		display: grid;
		gap: 1rem;
	}
</style>
