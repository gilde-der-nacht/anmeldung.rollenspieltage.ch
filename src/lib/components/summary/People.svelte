<script lang="ts">
	import type { AppState } from '$lib/shared/schema/app';
	import { localizeAgeGroup } from '$lib/shared/stores/ageGroup';
	import type { Writable } from 'svelte/store';
	import Alert from '$lib/components/common/Alert.svelte';
	import { validateState } from '$lib/shared/validation';
	import InteractionSymbol from '../tables/InteractionSymbol.svelte';
	import { isNonEmptyString } from '../form/Validation';

	export let appState: Writable<AppState>;
	$: v = validateState($appState);
</script>

<h4>Personen</h4>
{#if v.contact.name}
	<Alert type="danger">Dein Name fehlt auf der Seite "Kontaktperson".</Alert>
{/if}
{#if v.contact.email}
	<Alert type="danger">Deine E-Mail-Adresse fehlt auf der Seite "Kontaktperson".</Alert>
{/if}
{#if v.group.all}
	<Alert type="danger">Bitte korrigiere die Fehler auf der Seite "Gruppe".</Alert>
{/if}
<ul style="margin: 0;">
	<li>
		<strong>{v.contact.name ? '[Name fehlt]' : $appState.name}</strong> ({localizeAgeGroup[
			$appState.age_group
		]})<br />
		<small>Kontakt: {v.contact.email ? '[E-Mail-Adresse fehlt]' : $appState.email}</small>
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

{#if $appState.wants_to_help}
	<div class="check">
		<span class="success">
			<InteractionSymbol type="CHECKED" />
		</span>
		<span>
			Ich bin bereit bei einer Spiellücke maximal 2 Stunden an der Kiosk-Kasse auszuhelfen.
		</span>
	</div>
{/if}

{#if isNonEmptyString($appState.workshop_ideas)}
	<h5 style="margin: 0;">Ideen für Workshops und Diskussionsrunden</h5>
	<p>{$appState.workshop_ideas}</p>
{/if}

<style>
	.check {
		display: flex;
		gap: 1rem;
		align-items: center;
	}

	.success {
		color: var(--clr-success-11);
	}
</style>
