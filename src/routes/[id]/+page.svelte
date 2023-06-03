<script lang="ts">
	import { browser } from '$app/environment';
	import Alert from '$lib/common/Alert.svelte';
	import TextInput from '$lib/form/TextInput.svelte';
	import { initAppState } from '$lib/shared/stores/appState';
	import type { PageData } from './$types';

	export let data: PageData;
	const appState = initAppState(data.id, data.secret, data.registration);

	if (browser) {
		const url = new URL(location.href);
		url.searchParams.delete('created');
		history.replaceState(false, '', url);
	}
</script>

<h1>Anmeldung</h1>

{#if data.created}
	<Alert type="success">Anmeldung erfolgreich geöffnet.</Alert>
{/if}

<TextInput bind:initValue={$appState.name} label="Name" name="name" required />

<pre><code>{JSON.stringify($appState, null, 2)}</code></pre>
