<script lang="ts">
	import type { AppState } from '$lib/shared/schema/app';
	import type { GameRound } from '$lib/shared/schema/complex/gameRoundSchema';
	import type { Writable } from 'svelte/store';
	import GameRoundListEntry from './GameRoundListEntry.svelte';

	export let appState: Writable<AppState>;

	export let saveExistingRound: (gr: GameRound) => void;
	const sortByCreationDate = (a: GameRound, b: GameRound): number => {
		return a.date_created < b.date_created ? -1 : 1;
	};
</script>

<!-- svelte-ignore a11y-no-redundant-roles -->
<ul class="event-list" role="list">
	{#each ($appState.game_rounds ?? []).sort(sortByCreationDate) as round}
		{#if round.active}
			{#key round.id}
				<GameRoundListEntry {round} {saveExistingRound} />
			{/key}
		{/if}
	{/each}
</ul>

<style>
	.event-list {
		grid-template-columns: 1fr;
	}
</style>
