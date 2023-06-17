<script lang="ts">
	import Alert from '$lib/components/common/Alert.svelte';
	import { initAppState } from '$lib/shared/stores/appState';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import RegistrationFooter from '$lib/components/general/RegistrationFooter.svelte';
	import { removeCreated, updateUrl } from './urlUtil';
	import { saveOnUpdate } from './saveUtil';
	import type { SaveState } from '$lib/shared/save';
	import Steps from '$lib/components/navigation/Steps.svelte';
	import ContactPage from '$lib/pages/ContactPage.svelte';
	import GroupPage from '$lib/pages/GroupPage.svelte';
	import TimePage from '$lib/pages/TimePage.svelte';
	import PlayPage from '$lib/pages/PlayPage.svelte';
	import MasterPage from '$lib/pages/MasterPage.svelte';
	import SummaryPage from '$lib/pages/SummaryPage.svelte';
	import NavFooter from '$lib/components/navigation/NavFooter.svelte';
	import { pageEnumSchema } from '$lib/shared/schema/complex/navigation';

	export let data: PageData;
	const { appState, progressState } = initAppState(
		data.id,
		data.secret,
		'kontaktperson',
		data.registration,
	);

	let saveState: SaveState = 'WAITING';

	onMount(
		saveOnUpdate(appState, (newState) => {
			saveState = newState;
		}),
	);

	onMount(removeCreated);
	onMount(updateUrl(appState));
</script>

<h1 id="main-title">Anmeldung 2023</h1>

{#if data.created}
	<Alert type="success">Anmeldung erfolgreich geöffnet.</Alert>
{/if}

<section class="with-sidebar">
	<aside>
		<Steps {appState} />
	</aside>
	<main id="main-box">
		{#if $appState.page === pageEnumSchema.Enum.kontaktperson}
			<ContactPage {appState} />
		{:else if $appState.page === pageEnumSchema.Enum.gruppe}
			<GroupPage {appState} />
		{:else if $appState.page === pageEnumSchema.Enum.zeit}
			<TimePage {appState} />
		{:else if $appState.page === pageEnumSchema.Enum.spielen}
			<PlayPage {appState} />
		{:else if $appState.page === pageEnumSchema.Enum.leiten}
			<MasterPage {appState} />
		{:else if $appState.page === pageEnumSchema.Enum.zusammenfassung}
			<SummaryPage {appState} />
		{/if}
	</main>
</section>

<NavFooter {appState} />

<RegistrationFooter {saveState} {progressState} />

<pre><code>{JSON.stringify($appState, null, 2)}</code></pre>

<style>
	.with-sidebar {
		display: grid;
		margin-block-start: 3rem;
		gap: 3rem;
		position: relative;
	}

	@media (min-width: 1000px) {
		.with-sidebar {
			grid-template-columns: min-content 1fr;
		}
	}

	main {
		background-color: var(--clr-5);
		padding: 1rem;
		border-radius: 0.5rem;
	}
</style>
