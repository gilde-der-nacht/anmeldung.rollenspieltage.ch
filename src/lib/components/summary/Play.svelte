<script lang="ts">
	import type { AppState } from '$lib/shared/schema/app';
	import type { Writable } from 'svelte/store';
	import { validateState } from '$lib/shared/validation';

	export let appState: Writable<AppState>;
	$: v = validateState($appState);
</script>

<h4>Spielen</h4>
