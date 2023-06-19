<script lang="ts">
	import type { AppState } from '$lib/shared/schema/app';
	import TextInput from '$lib/components/form/TextInput.svelte';
	import Alert from '$lib/components/common/Alert.svelte';
	import Checkbox from '$lib/components/form/Checkbox.svelte';
	import RadioGroup from '$lib/components/form/RadioGroup.svelte';
	import { createDaysStore } from '$lib/shared/stores/days';
	import { createGroupStore } from '$lib/shared/stores/group';
	import type { Writable } from 'svelte/store';
	import { ageGroupOptions } from '$lib/shared/stores/ageGroup';
	import { validateState } from '$lib/shared/validation';

	export let appState: Writable<AppState>;
	const group = createGroupStore(appState);
	const days = createDaysStore(appState);
	$: v = validateState($appState);
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
	<Checkbox bind:state={$group.one.active}>{$group.one.active ? 'Aktiv' : 'Inaktiv'}</Checkbox>
	{#if $group.one.active}
		<TextInput
			label="Name Begleitung #1"
			name="name-friend-1"
			disabled={!$group.one.active}
			bind:value={$group.one.name}
			error={{
				condition: () => v.group.friend01.name,
				message: 'Begleitung #1 ist aktiv, aber "Name" ist leer.',
			}}
		/>
		<RadioGroup
			label="Altersgruppe Begleitung #1"
			disabled={!$group.one.active}
			bind:value={$group.one.age_group}
			options={ageGroupOptions}
		/>

		<fieldset>
			<legend>Anwesenheit Begleitung #1</legend>
			<div class="checkbox-list">
				<Checkbox bind:state={$group.one.days.SATURDAY} disabled={!$group.one.active}
					>Samstag</Checkbox
				>
				<Checkbox bind:state={$group.one.days.SUNDAY} disabled={!$group.one.active}
					>Sonntag</Checkbox
				>
			</div>
			{#if $group.one.active && ($days.SATURDAY || $days.SUNDAY)}
				{#if v.group.friend01.days.SATURDAY}
					<div style="margin-top: .5rem;">
						<Alert type="danger"
							>Du hast ausgewählt, dass ihr am Samstag nicht teilnehmt. Begleitungen können nicht
							ohne die Kontaktperson teilnehmen. Deaktiviere somit bitte hier den Samstag.</Alert
						>
					</div>
				{/if}
				{#if v.group.friend01.days.SUNDAY}
					<div style="margin-top: .5rem;">
						<Alert type="danger"
							>Du hast ausgewählt, dass ihr am Sonntag nicht teilnehmt. Begleitungen können nicht
							ohne die Kontaktperson teilnehmen. Deaktiviere somit bitte hier den Sonntag.</Alert
						>
					</div>
				{/if}
				{#if v.group.friend01.days.EITHER}
					<div style="margin-top: .5rem;">
						<Alert type="danger"
							>Wähle mindestens einen Tag für deine Begleitung aus oder deaktivere Begleitung #1.</Alert
						>
					</div>
				{/if}
			{/if}
		</fieldset>
	{:else}
		<Alert>Begleitung #1 wurde nicht ausgewählt.</Alert>
	{/if}

	<h4 style="margin-top: 1.5rem;">Begleitung #2</h4>
	<Checkbox bind:state={$group.two.active}>{$group.two.active ? 'Aktiv' : 'Inaktiv'}</Checkbox>
	{#if $group.two.active}
		<TextInput
			label="Name Begleitung #2"
			name="name-friend-2"
			disabled={!$group.two.active}
			bind:value={$group.two.name}
			error={{
				condition: () => v.group.friend02.name,
				message: 'Begleitung #2 ist aktiv, aber "Name" ist leer.',
			}}
		/>
		<RadioGroup
			label="Altersgruppe Begleitung #2"
			disabled={!$group.two.active}
			bind:value={$group.two.age_group}
			options={ageGroupOptions}
		/>

		<fieldset>
			<legend>Anwesenheit Begleitung #2</legend>
			<div class="checkbox-list">
				<Checkbox bind:state={$group.two.days.SATURDAY} disabled={!$group.two.active}
					>Samstag</Checkbox
				>
				<Checkbox bind:state={$group.two.days.SUNDAY} disabled={!$group.two.active}
					>Sonntag</Checkbox
				>
			</div>
			{#if $group.two.active && ($days.SATURDAY || $days.SUNDAY)}
				{#if v.group.friend02.days.SATURDAY}
					<div style="margin-top: .5rem;">
						<Alert type="danger"
							>Du hast ausgewählt, dass ihr am Samstag nicht teilnehmt. Begleitungen können nicht
							ohne die Kontaktperson teilnehmen. Deaktiviere somit bitte hier den Samstag.</Alert
						>
					</div>
				{/if}
				{#if v.group.friend02.days.SUNDAY}
					<div style="margin-top: .5rem;">
						<Alert type="danger"
							>Du hast ausgewählt, dass ihr am Sonntag nicht teilnehmt. Begleitungen können nicht
							ohne die Kontaktperson teilnehmen. Deaktiviere somit bitte hier den Sonntag.</Alert
						>
					</div>
				{/if}
				{#if v.group.friend02.days.EITHER}
					<div style="margin-top: .5rem;">
						<Alert type="danger"
							>Wähle mindestens einen Tag für deine Begleitung aus oder deaktivere Begleitung #2.</Alert
						>
					</div>
				{/if}
			{/if}
		</fieldset>
	{:else}
		<Alert>Begleitung #2 wurde nicht ausgewählt.</Alert>
	{/if}

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
