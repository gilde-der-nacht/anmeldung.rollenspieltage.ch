<script lang="ts">
	import type { GameRound } from '$lib/shared/schema/complex/gameRoundSchema';
	import type { AgeGroup, Genre } from '$lib/shared/schema/enums';
	import { writable } from 'svelte/store';
	import GameRoundEdit from '$lib/components/rounds/GameRoundEdit.svelte';
	import _ from 'lodash';
	import { scrollUp } from '$lib/shared/scroll';

	export let round: GameRound;
	export let saveExistingRound: (gr: GameRound) => void;
	const isEditing = writable(false);

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
	const gameRound = _.clone(round);

	const onAbort = () => {
		isEditing.set(false);
		scrollUp();
	};
	const onDelete = (gr: GameRound) => {
		const confirmed = confirm('Möchtest du diese Runde wirklich löschen?');
		if (confirmed) {
			saveExistingRound({ ...gr, active: false });
			isEditing.set(false);
			scrollUp();
		}
	};
	const onSave = (gr: GameRound) => {
		saveExistingRound(gr);
		isEditing.set(false);
		scrollUp();
	};
</script>

{#if $isEditing}
	<GameRoundEdit {gameRound} {onAbort} {onSave} {onDelete} />
{:else}
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
		<div class="event-description content" />
		<!-- svelte-ignore a11y-no-redundant-roles -->
		<ul role="list" class="event-links">
			<li>
				<button class="event-link" on:click={() => isEditing.set(true)}>
					<i class="fa-duotone fa-pen-to-square" />
					Spielrunde editieren
				</button>
			</li>
		</ul>
	</li>
{/if}

<style>
	.event-link {
		cursor: pointer;
		color: var(--clr-success-10);
	}
</style>
