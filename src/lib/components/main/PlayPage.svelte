<script lang="ts">
	import type { AppState } from '$lib/shared/schema/app';
	import { writable, type Writable } from 'svelte/store';
	import Alert from '../common/Alert.svelte';
	import Checkbox from '../form/Checkbox.svelte';
	import RadioGroup from '../form/RadioGroup.svelte';
	import type { Genre } from '$lib/shared/schema/enums';

	export let appState: Writable<AppState>;
	const genres = writable({
		fantasy: $appState.genres.includes('fantasy'),
		science_fiction: $appState.genres.includes('science_fiction'),
		horror: $appState.genres.includes('horror'),
		crime: $appState.genres.includes('crime'),
		modern: $appState.genres.includes('modern'),
	});
	genres.subscribe((g) => {
		const activeGenres: Genre[] = [];
		if (g.fantasy) {
			activeGenres.push('fantasy');
		}
		if (g.science_fiction) {
			activeGenres.push('science_fiction');
		}
		if (g.horror) {
			activeGenres.push('horror');
		}
		if (g.crime) {
			activeGenres.push('crime');
		}
		if (g.modern) {
			activeGenres.push('modern');
		}
		$appState.genres = activeGenres;
	});
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
	<h4 style="margin-top: .5rem;">Vorlieben</h4>
	<RadioGroup
		label="Bevorzugst du eher kurze oder lange Spielrunden?"
		bind:value={$appState.preferred_game_length}
		disabled={!$appState.wants_to_play}
		options={[
			{
				value: 'short_rounds',
				label: 'Ich bevorzuge kürzere Spielrunden (ca. 2 Stunden).',
			},
			{
				value: 'long_rounds',
				label: 'Ich bevorzuge längere Spielrunden (ca. 4 Stunden).',
			},
			{
				value: 'nothing_selected',
				label: 'Keine Angabe',
			},
		]}
	/>
	<fieldset>
		<legend>Genres</legend>
		<p style="margin-bottom: .5rem;">
			<em>
				Bitte wähle die Genres ab, die du gar nicht magst. Wir versuchen dies bei der
				Programmerstellung so gut es geht zu berücksichtigen.
			</em>
		</p>
		<div class="checkbox-list">
			<Checkbox bind:state={$genres.fantasy} disabled={!$appState.wants_to_play}>Fantasy</Checkbox>
			<Checkbox bind:state={$genres.science_fiction} disabled={!$appState.wants_to_play}>
				Science Fiction
			</Checkbox>
			<Checkbox bind:state={$genres.horror} disabled={!$appState.wants_to_play}>Horror</Checkbox>
			<Checkbox bind:state={$genres.crime} disabled={!$appState.wants_to_play}>Krimi</Checkbox>
			<Checkbox bind:state={$genres.modern} disabled={!$appState.wants_to_play}>Modern</Checkbox>
		</div>
	</fieldset>
	{#if $appState.genres.length === 0}
		<Alert type="danger">Wähle bitte mindestens ein Genre aus.</Alert>
	{/if}
</div>

<style>
	.page {
		display: grid;
		gap: 1rem;
	}
</style>
