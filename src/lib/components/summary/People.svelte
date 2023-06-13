<script lang="ts">
	import type { AppState } from '$lib/shared/schema/app';
	import { localizeAgeGroup } from '$lib/shared/stores/ageGroup';
	import type { Writable } from 'svelte/store';
	import { isNonEmptyString } from '$lib/components/form/Validation';
	import Alert from '$lib/components/common/Alert.svelte';

	export let appState: Writable<AppState>;
	$: nameIsMissing = !isNonEmptyString($appState.name);
	$: emailIsMissing = !isNonEmptyString($appState.email);
	$: friend1HasErrors = true;
	$: groupHasErrors = friend1HasErrors;
</script>

<h4>Personen</h4>
{#if nameIsMissing}
	<Alert type="danger">Dein Name fehlt auf der Seite "Kontaktperson".</Alert>
{/if}
{#if emailIsMissing}
	<Alert type="danger">Deine E-Mail-Adresse fehlt auf der Seite "Kontaktperson".</Alert>
{/if}
<ul style="margin: 0;">
	<li>
		<strong>{nameIsMissing ? '[Name fehlt]' : $appState.name}</strong> ({localizeAgeGroup[
			$appState.age_group
		]})<br />
		<small>Kontakt: {emailIsMissing ? '[E-Mail-Adresse fehlt]' : $appState.email}</small>
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
