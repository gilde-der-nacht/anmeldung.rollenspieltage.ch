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
		bind:value={$appState.group.one.name}
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

	<fieldset>
		<legend>Anwesenheit Begleitung #1</legend>
		<div class="checkbox-list">
			<Checkbox
				bind:state={$appState.group.one.days.saturday}
				disabled={!$appState.group.one.active}>Samstag</Checkbox
			>
			<Checkbox bind:state={$appState.group.one.days.sunday} disabled={!$appState.group.one.active}
				>Sonntag</Checkbox
			>
		</div>
		{#if $appState.group.one.active && ($appState.days.saturday || $appState.days.sunday)}
			{#if !$appState.days.saturday && $appState.group.one.days.saturday}
				<div style="margin-top: .5rem;">
					<Alert type="danger"
						>Du hast ausgewählt, dass ihr am Samstag nicht teilnehmt. Begleitungen können nicht ohne
						die Kontaktperson teilnehmen. Deaktiviere somit bitte hier den Samstag.</Alert
					>
				</div>
			{/if}
			{#if !$appState.days.sunday && $appState.group.one.days.sunday}
				<div style="margin-top: .5rem;">
					<Alert type="danger"
						>Du hast ausgewählt, dass ihr am Sonntag nicht teilnehmt. Begleitungen können nicht ohne
						die Kontaktperson teilnehmen. Deaktiviere somit bitte hier den Sonntag.</Alert
					>
				</div>
			{/if}
			{#if !$appState.group.one.days.saturday && !$appState.group.one.days.sunday}
				<div style="margin-top: .5rem;">
					<Alert type="danger"
						>Wähle mindestens einen Tag für deine Begleitung aus oder deaktivere Begleitung #1.</Alert
					>
				</div>
			{/if}
		{/if}
	</fieldset>

	<h4 style="margin-top: 1.5rem;">Begleitung #2</h4>
	<Checkbox bind:state={$appState.group.two.active}>Aktiv</Checkbox>
	<TextInput
		label="Name Begleitung #2"
		name="name-friend-2"
		disabled={!$appState.group.two.active}
		bind:value={$appState.group.two.name}
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

	<fieldset>
		<legend>Anwesenheit Begleitung #2</legend>
		<div class="checkbox-list">
			<Checkbox
				bind:state={$appState.group.two.days.saturday}
				disabled={!$appState.group.two.active}>Samstag</Checkbox
			>
			<Checkbox bind:state={$appState.group.two.days.sunday} disabled={!$appState.group.two.active}
				>Sonntag</Checkbox
			>
		</div>
		{#if $appState.group.two.active && ($appState.days.saturday || $appState.days.sunday)}
			{#if !$appState.days.saturday && $appState.group.two.days.saturday}
				<div style="margin-top: .5rem;">
					<Alert type="danger"
						>Du hast ausgewählt, dass ihr am Samstag nicht teilnehmt. Begleitungen können nicht ohne
						die Kontaktperson teilnehmen. Deaktiviere somit bitte hier den Samstag.</Alert
					>
				</div>
			{/if}
			{#if !$appState.days.sunday && $appState.group.two.days.sunday}
				<div style="margin-top: .5rem;">
					<Alert type="danger"
						>Du hast ausgewählt, dass ihr am Sonntag nicht teilnehmt. Begleitungen können nicht ohne
						die Kontaktperson teilnehmen. Deaktiviere somit bitte hier den Sonntag.</Alert
					>
				</div>
			{/if}
			{#if !$appState.group.two.days.saturday && !$appState.group.two.days.sunday}
				<div style="margin-top: .5rem;">
					<Alert type="danger"
						>Wähle mindestens einen Tag für deine Begleitung aus oder deaktivere Begleitung #2.</Alert
					>
				</div>
			{/if}
		{/if}
	</fieldset>

	<div style="margin-top: 1.5rem;">
		<Alert>
			<p>Seid ihr mehr als drei Personen, dann teilt euch bitte in mehrere kleinere Gruppen auf.</p>
		</Alert>
	</div>
</div>

<style>
	.page {
		display: grid;
		gap: 1rem;
	}
</style>
