<script lang="ts">
	import type { AppState } from '$lib/shared/schema/app';
	import Alert from '$lib/components/common/Alert.svelte';
	import Checkbox from '$lib/components/form/Checkbox.svelte';
	import TimeTable from '$lib/components/tables/TimeTable.svelte';
	import RadioGroup from '$lib/components/form/RadioGroup.svelte';
	import { createDaysStore } from '$lib/shared/stores/days';
	import type { Writable } from 'svelte/store';
	import { validateState } from '$lib/shared/validation';

	export let appState: Writable<AppState>;

	const days = createDaysStore(appState);
	$: v = validateState($appState);
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
		<Checkbox bind:state={$days.SATURDAY}>Samstag</Checkbox>
		<Checkbox bind:state={$days.SUNDAY}>Sonntag</Checkbox>
	</div>
	{#if v.time}
		<Alert type="danger">Du musst mindestens einen Tag auswählen.</Alert>
	{/if}
	<h4 style="margin-top: .5rem;">Samstag, 26. August 2023</h4>
	{#if $days.SATURDAY}
		<TimeTable day="SATURDAY" {appState} />
	{:else}
		<Alert>Samstag wurde nicht ausgewählt.</Alert>
	{/if}
	<h4 style="margin-top: .5rem;">Sonntag, 27. August 2023</h4>
	{#if $days.SUNDAY}
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
