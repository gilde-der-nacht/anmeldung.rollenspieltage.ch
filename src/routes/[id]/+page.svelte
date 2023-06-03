<script lang="ts">
	import Alert from '$lib/components/common/Alert.svelte';
	import TextInput from '$lib/components/form/TextInput.svelte';
	import { initAppState } from '$lib/shared/stores/appState';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { save } from '$lib/shared/save';
	import { readonly } from 'svelte/store';
	import _ from 'lodash';

	export let data: PageData;
	const appState = initAppState(data.id, data.secret, data.registration);

	onMount(() => {
		appState.subscribe(async (state) => {
			const res = await save(_.clone(state), readonly(appState), async (state) =>
				console.log(state),
			);
			if (res.success) {
				appState.update((prev) => ({ ...prev, previous_registration_entry: res.id }));
			}
		});
	});

	onMount(() => {
		const url = new URL(location.href);
		url.searchParams.delete('created');
		history.replaceState(false, '', url);
	});
</script>

<h1>Anmeldung</h1>

{#if data.created}
	<Alert type="success">Anmeldung erfolgreich geöffnet.</Alert>
{/if}

<TextInput bind:initValue={$appState.name} label="Name" name="name" required />

<pre><code>{JSON.stringify($appState, null, 2)}</code></pre>
