<script lang="ts">
	import Alert from '$lib/components/common/Alert.svelte';
	import TextInput from '$lib/components/form/TextInput.svelte';
	import { initAppState } from '$lib/shared/stores/appState';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import RegistrationFooter from '$lib/components/general/RegistrationFooter.svelte';
	import { removeCreated } from './urlUtil';
	import { saveOnUpdate } from './saveUtil';
	import type { SaveState } from '$lib/shared/save';

	export let data: PageData;
	const appState = initAppState(data.id, data.secret, data.registration);

	let saveState: SaveState = 'WAITING';

	onMount(
		saveOnUpdate(appState, (newState) => {
			saveState = newState;
		}),
	);

	onMount(removeCreated);
</script>

<h1>Anmeldung</h1>

{#if data.created}
	<Alert type="success">Anmeldung erfolgreich geöffnet.</Alert>
{/if}

<TextInput bind:initValue={$appState.name} label="Name" name="name" required />

<pre><code>{JSON.stringify($appState, null, 2)}</code></pre>
<pre><code>{JSON.stringify($appState, null, 2)}</code></pre>
<pre><code>{JSON.stringify($appState, null, 2)}</code></pre>
<pre><code>{JSON.stringify($appState, null, 2)}</code></pre>
<pre><code>{JSON.stringify($appState, null, 2)}</code></pre>
<pre><code>{JSON.stringify($appState, null, 2)}</code></pre>

<RegistrationFooter {saveState} />
