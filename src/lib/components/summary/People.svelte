<script lang="ts">
	import type { AppState } from '$lib/shared/schema/app';
	import { localizeAgeGroup } from '$lib/shared/stores/ageGroup';
	import type { Writable } from 'svelte/store';
	import Alert from '$lib/components/common/Alert.svelte';
	import { validateState } from '$lib/shared/validation';

	export let appState: Writable<AppState>;
	$: v = validateState($appState);
</script>

<h4>Personen</h4>
{#if v.name}
	<Alert type="danger">Dein Name fehlt auf der Seite "Kontaktperson".</Alert>
{/if}
{#if v.email}
	<Alert type="danger">Deine E-Mail-Adresse fehlt auf der Seite "Kontaktperson".</Alert>
{/if}
{#if v.group}
	<Alert type="danger">Bitte korrigiere die Fehler auf der Seite "Gruppe".</Alert>
{/if}
<ul style="margin: 0;">
	<li>
		<strong>{v.name ? '[Name fehlt]' : $appState.name}</strong> ({localizeAgeGroup[
			$appState.age_group
		]})<br />
		<small>Kontakt: {v.email ? '[E-Mail-Adresse fehlt]' : $appState.email}</small>
	</li>
	{#if $appState.group[0]?.active}
		<li>
			<strong>{$appState.group[0]?.name}</strong> ({localizeAgeGroup[$appState.group[0].age_group]})
		</li>
	{/if}
	{#if $appState.group[1]?.active}
		<li>
			<strong>{$appState.group[1]?.name}</strong> ({localizeAgeGroup[$appState.group[1].age_group]})
		</li>
	{/if}
</ul>
