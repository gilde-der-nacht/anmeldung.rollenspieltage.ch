<script lang="ts">
	import type { AppState } from '$lib/shared/schema/app';
	import type { Writable } from 'svelte/store';
	import TextInput from '../form/TextInput.svelte';
	import Alert from '../common/Alert.svelte';
	import Checkbox from '../form/Checkbox.svelte';
	import { isNonEmptyString } from '../form/Validation';
	import RadioGroup from '../form/RadioGroup.svelte';

	export let appState: Writable<AppState>;
</script>

<div class="page">
	<h3>Gruppe</h3>
	<Alert>
		<p>
			Auf dieser Seite hast du die Möglichkeit bis zu zwei weitere Personen anzumelden, die dasselbe
			Programm erhalten werden wie du.
		</p>
	</Alert>

	<h4 style="margin-top: 1.5rem;">Begleitung #1</h4>
	<Checkbox bind:state={$appState.group.one.active}>Aktiv</Checkbox>
	<TextInput
		label="Name Begleitung #1"
		name="name-friend-1"
		disabled={!$appState.group.one.active}
		bind:initValue={$appState.group.one.name}
		error={{
			condition: () => !isNonEmptyString($appState.group.one.name) && $appState.group.one.active,
			message: 'Begleitung #1 ist aktiv, aber "Name" ist leer.',
		}}
	/>
	<RadioGroup
		label="Altersgruppe Begleitung #1"
		disabled={!$appState.group.one.active}
		bind:value={$appState.group.one.age_group}
		options={[
			{ value: 'CHILD', label: '6 bis 9 Jahre' },
			{ value: 'TEEN', label: '10 bis 15 Jahre' },
			{ value: 'ADULT', label: '16+ Jahre' },
		]}
	/>

	<h4 style="margin-top: 1.5rem;">Begleitung #2</h4>
	<Checkbox bind:state={$appState.group.two.active}>Aktiv</Checkbox>
	<TextInput
		label="Name Begleitung #2"
		name="name-friend-2"
		disabled={!$appState.group.two.active}
		bind:initValue={$appState.group.two.name}
		error={{
			condition: () => !isNonEmptyString($appState.group.two.name) && $appState.group.two.active,
			message: 'Begleitung #2 ist aktiv, aber "Name" ist leer.',
		}}
	/>
	<RadioGroup
		label="Altersgruppe Begleitung #2"
		disabled={!$appState.group.two.active}
		bind:value={$appState.group.two.age_group}
		options={[
			{ value: 'CHILD', label: '6 bis 9 Jahre' },
			{ value: 'TEEN', label: '10 bis 15 Jahre' },
			{ value: 'ADULT', label: '16+ Jahre' },
		]}
	/>

	<div style="margin-top: 1.5rem;">
		<Alert>
			<p>Seid ihr mehr als drei Personen, dann teilt euch bitte in kleinere Gruppen auf.</p>
		</Alert>
	</div>
</div>

<style>
	.page {
		display: grid;
		gap: 1rem;
	}
</style>
