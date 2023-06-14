<script lang="ts">
	import type { GameRound } from '$lib/shared/schema/complex/gameRoundSchema';
	import type { AgeGroup, Genre } from '$lib/shared/schema/enums';
	import { writable } from 'svelte/store';
	import GameRoundEdit from '$lib/components/rounds/GameRoundEdit.svelte';
	import _ from 'lodash';
	import { scrollUp } from '$lib/shared/scroll';
	import { localizeGenre } from '$lib/shared/stores/genres';
	import { localizeAgeGroup } from '$lib/shared/stores/ageGroup';

	export let round: GameRound;
</script>

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
			<span>{round.genres.map((g) => localizeGenre[g]).join(', ')}</span>
		</div>
		<div class="event-date" title="Geeignet für Altergruppen">
			<div class="event-icon">
				<i class="fa-duotone fa-baby-carriage" />
			</div>
			<span>{round.age_groups.map((ag) => localizeAgeGroup[ag]).join(', ')}</span>
		</div>
	</div>
</li>
