<script lang="ts">
	import type { AppState } from '$lib/shared/schema/app';
	import type { Writable } from 'svelte/store';
	import { validateState } from '$lib/shared/validation';
	import InteractionSymbol from '../tables/InteractionSymbol.svelte';
	import Alert from '../common/Alert.svelte';
	import GameRoundListEntry from '../rounds/GameRoundListEntry.svelte';
	import GameRoundListEntryReadonly from '../rounds/GameRoundListEntryReadonly.svelte';
	import type { GameRound } from '$lib/shared/schema/complex/gameRoundSchema';

	export let appState: Writable<AppState>;
	$: v = validateState($appState);

	const sortByCreationDate = (a: GameRound, b: GameRound): number => {
		return a.date_created < b.date_created ? -1 : 1;
	};
</script>

{#if $appState.wants_to_master}
	<h4>Spiel Leiten</h4>
	<div class="check">
		<span class="success">
			<InteractionSymbol type="CHECKED" />
		</span>
		<span>Ich möchte gerne als Spielleiter:in teilnehmen.</span>
	</div>
	<h5 style="margin: 0;">
		Spielrunden (Total: {($appState.game_rounds ?? []).filter((g) => g.active).length})
	</h5>

	<!-- svelte-ignore a11y-no-redundant-roles -->
	<ul class="event-list" role="list">
		{#each ($appState.game_rounds ?? []).sort(sortByCreationDate) as round}
			{#if round.active}
				{#key round.id}
					<GameRoundListEntryReadonly {round} />
				{/key}
			{/if}
		{/each}
	</ul>

	{#if v.gameRounds}
		<Alert type="danger"
			>Bitte füge mindestens eine Spielrunde hinzu auf der Seite "Spiel Leiten".</Alert
		>
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
