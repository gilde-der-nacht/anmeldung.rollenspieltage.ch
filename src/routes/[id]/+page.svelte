<script lang="ts">
	import { browser } from '$app/environment';
	import Alert from '$lib/common/Alert.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

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

<pre><code>{JSON.stringify(data.registration, null, 2)}</code></pre>
