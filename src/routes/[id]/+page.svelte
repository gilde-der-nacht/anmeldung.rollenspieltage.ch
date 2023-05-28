<script lang="ts">
	import Alert from '$lib/common/Alert.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>{data.id}</h1>
<h2>{data.secret}</h2>

{#if data.created}
	<Alert type="success">Anmeldung erfolgreich geöffnet.</Alert>
{/if}
