<script lang="ts">
	import type { AppState } from '$lib/shared/schema/app';
	import type { Writable } from 'svelte/store';
	import TextInput from '$lib/components/form/TextInput.svelte';
	import Checkbox from '$lib/components/form/Checkbox.svelte';
	import RadioGroup from '$lib/components/form/RadioGroup.svelte';
	import Alert from '$lib/components/common/Alert.svelte';
	import { ageGroupOptions } from '$lib/shared/stores/ageGroup';
	import { validateState } from '$lib/shared/validation';
	import type { VisitedPage } from '$lib/shared/schema/enums';
	import TextareaInput from '$lib/components/form/TextareaInput.svelte';

	export let appState: Writable<AppState>;
	$: v = validateState($appState);
	appState.update((prev) => ({
		...prev,
		visited_pages: [...new Set<VisitedPage>([...prev.visited_pages, 'CONTACT'])],
	}));
</script>

<div class="page">
	<h3>Kontaktperson</h3>

	<TextInput
		bind:value={$appState.name}
		label="Name"
		name="name"
		required
		error={{
			condition: () => v.contact.name,
			message: '"Name" darf nicht leer sein.',
		}}
	/>

	<TextInput
		bind:value={$appState.email}
		label="E-Mail"
		name="email"
		required
		error={{
			condition: () => v.contact.email,
			message: '"E-Mail" darf nicht leer sein.',
		}}
	/>

	<RadioGroup label="Altersgruppe" bind:value={$appState.age_group} options={ageGroupOptions} />

	<h4 style="margin-top: 1.5rem;">Helfen</h4>
	<Checkbox bind:state={$appState.wants_to_help}>
		Ich bin bereit bei einer Spiellücke maximal 2 Stunden an der Kiosk-Kasse auszuhelfen.
	</Checkbox>

	<h4 style="margin-top: 1.5rem;">Workshops & Diskussionsrunden</h4>
	<TextareaInput
		label="Gibt es Rollenspiel-Themen, die dich besonders interessieren? Je nach Nachfrage werden wir spontane Workshops und Diskussionsrunden organisieren."
		name="workshops"
		placeholder="Ideen und Inputs zu möglichen Workshops und Diskussionsrunden ..."
		bind:value={$appState.workshop_ideas}
	/>

	<div style="margin-top: 1.5rem;">
		<Alert type="special">
			Die Kontaktdaten werden ausschliesslich verwendet, um dir die notwendigen Informationen zu den
			Luzerner Rollenspieltage 2023 zu senden. Möchtest du gerne darüber hinaus über Spielevents von
			uns informiert werden, dann trage dich am besten für unseren Newsletter ein:
			<a href="https://rollenspieltage.ch/newsletter/">rollenspieltage.ch/newsletter</a>
		</Alert>
	</div>
</div>

<style>
	.page {
		display: grid;
		gap: 1rem;
	}
</style>
