<script lang="ts">
	import type { AppState } from '$lib/shared/schema/app';
	import type { GameRound } from '$lib/shared/schema/complex/gameRoundSchema';
	import type { AgeGroup, Genre } from '$lib/shared/schema/enums';
	import type { Writable } from 'svelte/store';

	export let appState: Writable<AppState>;
	const genreMap: { [Key in Genre]: string } = {
		fantasy: 'Fantasy',
		science_fiction: 'Science Fiction',
		horror: 'Horror',
		crime: 'Krimi',
		modern: 'Modern',
	};
	const ageGroupMap: { [Key in AgeGroup]: string } = {
		CHILD: '6 bis 9 Jahre',
		TEEN: '10 bis 15 Jahre',
		ADULT: '16+ Jahre',
	};

	export let saveExistingRound: (gr: GameRound) => void;
</script>

<!-- svelte-ignore a11y-no-redundant-roles -->
<ul class="event-list" role="list">
	{#each $appState.game_rounds as round}
		{#if round.active}
			<li class="event-entry gray">
				<h1 class="event-title">{round.title} <small>({round.system})</small></h1>
				<div class="event-details">
					<div class="event-date" title="Rundendauer">
						<div class="event-icon">
							<i class="fa-duotone fa-clock" />
						</div>
						<span>{round.duration === 'long_rounds' ? 'max. 4 Stunden' : 'max. 2 Stunden'}</span>
					</div>
					<div class="event-date" title="Spieleranzahl">
						<div class="event-icon">
							<i class="fa-duotone fa-users" />
						</div>
						<span>{round.player_count_min} bis {round.player_count_max} Spieler:innen</span>
					</div>
					<div class="event-date" title="Genres">
						<div class="event-icon">
							<i class="fa-duotone fa-tags" />
						</div>
						<span>{round.genres.map((g) => genreMap[g]).join(', ')}</span>
					</div>
					<div class="event-date" title="Geeignet für Altergruppen">
						<div class="event-icon">
							<i class="fa-duotone fa-baby-carriage" />
						</div>
						<span>{round.age_groups.map((ag) => ageGroupMap[ag]).join(', ')}</span>
					</div>
				</div>
			</li>
		{/if}
	{/each}
</ul>
