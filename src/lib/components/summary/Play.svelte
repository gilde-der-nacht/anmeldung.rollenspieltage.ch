<script lang="ts">
	import type { AppState } from '$lib/shared/schema/app';
	import type { Writable } from 'svelte/store';
	import { validateState } from '$lib/shared/validation';
	import InteractionSymbol from '../tables/InteractionSymbol.svelte';
	import { genreList } from '$lib/shared/schema/enums';
	import { localizeGenre } from '$lib/shared/stores/genres';
	import Alert from '../common/Alert.svelte';
	import { localizeGameLength2 } from '$lib/shared/stores/misc';

	export let appState: Writable<AppState>;
	$: v = validateState($appState);
</script>

{#if $appState.wants_to_play}
	<h4>Spielen</h4>
	<div class="check">
		<span class="success">
			<InteractionSymbol type="CHECKED" />
		</span>
		<span>Ich möchte gerne als Spieler:in teilnehmen.</span>
	</div>
	<h5 style="margin: 0;">Vorlieben</h5>
	<p><strong>Spiellänge:</strong> {localizeGameLength2[$appState.preferred_game_length]}</p>
	<p><strong>Genres:</strong> {$appState.genres.map((g) => localizeGenre[g]).join(', ')}</p>
	{#if v.genres}
		<Alert type="danger">Bitte wähle mindestens ein Genre aus auf der Seite "Spielen".</Alert>
	{/if}
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
