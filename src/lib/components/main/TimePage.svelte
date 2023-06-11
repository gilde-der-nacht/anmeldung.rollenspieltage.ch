<script lang="ts">
	import type { AppState } from '$lib/shared/schema/app';
	import type { Writable } from 'svelte/store';
	import Alert from '../common/Alert.svelte';
	import Checkbox from '../form/Checkbox.svelte';
	import TimeTable from '../tables/TimeTable.svelte';
	import RadioGroup from '../form/RadioGroup.svelte';

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
	{#if !$appState.days.saturday && !$appState.days.sunday}
		<Alert type="danger">Du musst mindestens einen Tag auswählen.</Alert>
	{/if}
	<h4 style="margin-top: .5rem;">Samstag, 26. August 2023</h4>
	{#if $appState.days.saturday}
		<TimeTable day="SATURDAY" {appState} />
	{:else}
		<Alert>Samstag wurde nicht ausgewählt.</Alert>
	{/if}
	<h4 style="margin-top: .5rem;">Sonntag, 27. August 2023</h4>
	{#if $appState.days.sunday}
		<TimeTable day="SUNDAY" {appState} />
	{:else}
		<Alert>Sonntag wurde nicht ausgewählt.</Alert>
	{/if}

	<h4 style="margin-top: 1rem;">Verpflegung</h4>
	<Alert>
		Wir werden wie oben im Programm markiert drei warme Malzeiten kochen. Falls du an einem oder
		mehreren Mittag-/Abendessen vor Ort sein wirst, würden wir uns vorab freuen, eine ungefähre
		Einschätzung zu erhalten, wie viele Malzeiten wir vorbereiten dürfen.
	</Alert>
	<RadioGroup
		label="Planst du vor Ort zu Essen?"
		bind:value={$appState.eat_preference}
		options={[
			{
				value: 'plans_to_eat',
				label: 'Ich werde vermutlich von eure Essensangebot gebrauch machen.',
			},
			{
				value: 'plans_not_to_eat',
				label: 'Ich werde mich voraussichtlich selber um meine Verpflegung kümmern.',
			},
			{
				value: 'nothing_selected',
				label: 'Keine Angabe',
			},
		]}
	/>
</div>

<style>
	.page {
		display: grid;
		gap: 1rem;
	}
</style>
