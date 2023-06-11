<script lang="ts">
	import type { AppState } from '$lib/shared/schema/app';
	import { writable, type Writable } from 'svelte/store';
	import TextInput from '../form/TextInput.svelte';
	import Alert from '../common/Alert.svelte';
	import Checkbox from '../form/Checkbox.svelte';
	import { isNonEmptyString } from '../form/Validation';
	import RadioGroup from '../form/RadioGroup.svelte';
	import type { Day } from '$lib/shared/schema/enums';

	export let appState: Writable<AppState>;

	const [one, two] = $appState.group;
	if (one === undefined || two === undefined) {
		throw new Error('3204: Unbekannter Fehler');
	}
	const group = writable({
		one: {
			...one,
			days: {
				SATURDAY: one.days.includes('SATURDAY'),
				SUNDAY: one.days.includes('SUNDAY'),
			},
		},
		two: {
			...two,
			days: {
				SATURDAY: two.days.includes('SATURDAY'),
				SUNDAY: two.days.includes('SUNDAY'),
			},
		},
	});
	group.subscribe((g) => {
		const daysOne: Day[] = [];
		if (g.one.days.SATURDAY) {
			daysOne.push('SATURDAY');
		}
		if (g.one.days.SUNDAY) {
			daysOne.push('SUNDAY');
		}
		const daysTwo: Day[] = [];
		if (g.two.days.SATURDAY) {
			daysTwo.push('SATURDAY');
		}
		if (g.two.days.SUNDAY) {
			daysTwo.push('SUNDAY');
		}
		$appState.group = [
			{ ...g.one, days: daysOne },
			{ ...g.two, days: daysTwo },
		];
	});

	const days = writable({
		SATURDAY: $appState.days.includes('SATURDAY'),
		SUNDAY: $appState.days.includes('SUNDAY'),
	});
	days.subscribe((d) => {
		const ds: Day[] = [];
		if (d.SATURDAY) {
			ds.push('SATURDAY');
		}
		if (d.SUNDAY) {
			ds.push('SUNDAY');
		}
		$appState.days = ds;
	});
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
	<Checkbox bind:state={$group.one.active}>Aktiv</Checkbox>
	<TextInput
		label="Name Begleitung #1"
		name="name-friend-1"
		disabled={!$group.one.active}
		bind:value={$group.one.name}
		error={{
			condition: () => !isNonEmptyString($group.one.name) && $group.one.active,
			message: 'Begleitung #1 ist aktiv, aber "Name" ist leer.',
		}}
	/>
	<RadioGroup
		label="Altersgruppe Begleitung #1"
		disabled={!$group.one.active}
		bind:value={$group.one.age_group}
		options={[
			{ value: 'CHILD', label: '6 bis 9 Jahre' },
			{ value: 'TEEN', label: '10 bis 15 Jahre' },
			{ value: 'ADULT', label: '16+ Jahre' },
		]}
	/>

	<fieldset>
		<legend>Anwesenheit Begleitung #1</legend>
		<div class="checkbox-list">
			<Checkbox bind:state={$group.one.days.SATURDAY} disabled={!$group.one.active}
				>Samstag</Checkbox
			>
			<Checkbox bind:state={$group.one.days.SUNDAY} disabled={!$group.one.active}>Sonntag</Checkbox>
		</div>
		{#if $group.one.active && ($days.SATURDAY || $days.SUNDAY)}
			{#if !$days.SATURDAY && $group.one.days.SATURDAY}
				<div style="margin-top: .5rem;">
					<Alert type="danger"
						>Du hast ausgewählt, dass ihr am Samstag nicht teilnehmt. Begleitungen können nicht ohne
						die Kontaktperson teilnehmen. Deaktiviere somit bitte hier den Samstag.</Alert
					>
				</div>
			{/if}
			{#if !$days.SUNDAY && $group.one.days.SUNDAY}
				<div style="margin-top: .5rem;">
					<Alert type="danger"
						>Du hast ausgewählt, dass ihr am Sonntag nicht teilnehmt. Begleitungen können nicht ohne
						die Kontaktperson teilnehmen. Deaktiviere somit bitte hier den Sonntag.</Alert
					>
				</div>
			{/if}
			{#if !$group.one.days.SATURDAY && !$group.one.days.SUNDAY}
				<div style="margin-top: .5rem;">
					<Alert type="danger"
						>Wähle mindestens einen Tag für deine Begleitung aus oder deaktivere Begleitung #1.</Alert
					>
				</div>
			{/if}
		{/if}
	</fieldset>

	<h4 style="margin-top: 1.5rem;">Begleitung #2</h4>
	<Checkbox bind:state={$group.two.active}>Aktiv</Checkbox>
	<TextInput
		label="Name Begleitung #2"
		name="name-friend-2"
		disabled={!$group.two.active}
		bind:value={$group.two.name}
		error={{
			condition: () => !isNonEmptyString($group.two.name) && $group.two.active,
			message: 'Begleitung #2 ist aktiv, aber "Name" ist leer.',
		}}
	/>
	<RadioGroup
		label="Altersgruppe Begleitung #2"
		disabled={!$group.two.active}
		bind:value={$group.two.age_group}
		options={[
			{ value: 'CHILD', label: '6 bis 9 Jahre' },
			{ value: 'TEEN', label: '10 bis 15 Jahre' },
			{ value: 'ADULT', label: '16+ Jahre' },
		]}
	/>

	<fieldset>
		<legend>Anwesenheit Begleitung #2</legend>
		<div class="checkbox-list">
			<Checkbox bind:state={$group.two.days.SATURDAY} disabled={!$group.two.active}
				>Samstag</Checkbox
			>
			<Checkbox bind:state={$group.two.days.SUNDAY} disabled={!$group.two.active}>Sonntag</Checkbox>
		</div>
		{#if $group.two.active && ($days.SATURDAY || $days.SUNDAY)}
			{#if !$days.SATURDAY && $group.two.days.SATURDAY}
				<div style="margin-top: .5rem;">
					<Alert type="danger"
						>Du hast ausgewählt, dass ihr am Samstag nicht teilnehmt. Begleitungen können nicht ohne
						die Kontaktperson teilnehmen. Deaktiviere somit bitte hier den Samstag.</Alert
					>
				</div>
			{/if}
			{#if !$days.SUNDAY && $group.two.days.SUNDAY}
				<div style="margin-top: .5rem;">
					<Alert type="danger"
						>Du hast ausgewählt, dass ihr am Sonntag nicht teilnehmt. Begleitungen können nicht ohne
						die Kontaktperson teilnehmen. Deaktiviere somit bitte hier den Sonntag.</Alert
					>
				</div>
			{/if}
			{#if !$group.two.days.SATURDAY && !$group.two.days.SUNDAY}
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
