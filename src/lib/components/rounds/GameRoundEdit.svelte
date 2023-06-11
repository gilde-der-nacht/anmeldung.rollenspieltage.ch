<script lang="ts">
	import { writable } from 'svelte/store';
	import Button from '../form/Button.svelte';
	import TextInput from '../form/TextInput.svelte';
	import RadioGroup from '../form/RadioGroup.svelte';
	import NumberInput from '../form/NumberInput.svelte';
	import Checkbox from '../form/Checkbox.svelte';
	import type { AgeGroup, GameLength2, Genre } from '$lib/shared/schema/enums';
	import type { GameRound } from '$lib/shared/schema/complex/gameRoundSchema';
	import { getDefaultGameRound } from './roundUtil';
	import _ from 'lodash';
	import { createGenresStore } from '$lib/shared/stores/genres';
	import { createAgeGroupStore } from '$lib/shared/stores/ageGroup';

	export let gameRound: GameRound = getDefaultGameRound();
	const round = writable<GameRound>(_.clone(gameRound));

	export let onSave: (gr: GameRound) => void;
	export let onDelete: (() => void) | undefined = undefined;
	export let onAbort: () => void;

	$: isNew = onDelete === undefined;

	const genres = createGenresStore(round);
	const age_groups = createAgeGroupStore(round);
</script>

<div class="event-entry">
	<h1 class="event-title">{isNew ? 'Neue Runde erfassen' : 'Runde anpassen'}</h1>
	<div class="event-description content">
		<form on:submit={() => onSave({ ...$round })}>
			<TextInput label="Titel" bind:value={$round.title} name="title" />
			<TextInput label="System" bind:value={$round.system} name="system" />
			<RadioGroup
				label="Dauer der Spielrunde"
				bind:value={$round.duration}
				options={[
					{
						value: 'short_rounds',
						label: 'Kurz (max. 2 Stunden)',
					},
					{
						value: 'long_rounds',
						label: 'Lang (max. 4 Stunden)',
					},
				]}
			/>
			<div style="display: flex; flex-wrap: wrap; gap: 1rem;">
				<NumberInput
					label="Spieleranzahl (Minimum)"
					bind:value={$round.player_count_min}
					name="player_count_min"
				/>
				<NumberInput
					label="Spieleranzahl (Maximum)"
					bind:value={$round.player_count_max}
					name="player_count_max"
				/>
			</div>
			<fieldset>
				<legend>Genres</legend>
				<div class="checkbox-list">
					<Checkbox bind:state={$genres.fantasy}>Fantasy</Checkbox>
					<Checkbox bind:state={$genres.science_fiction}>Science Fiction</Checkbox>
					<Checkbox bind:state={$genres.horror}>Horror</Checkbox>
					<Checkbox bind:state={$genres.crime}>Krimi</Checkbox>
					<Checkbox bind:state={$genres.modern}>Modern</Checkbox>
				</div>
			</fieldset>

			<fieldset>
				<legend>Altersgruppen</legend>
				<div class="checkbox-list">
					<Checkbox bind:state={$age_groups.child}>6 bis 9 Jahre</Checkbox>
					<Checkbox bind:state={$age_groups.teen}>10 bis 15 Jahre</Checkbox>
					<Checkbox bind:state={$age_groups.adult}>16+ Jahre</Checkbox>
				</div>
			</fieldset>

			<div style="display: flex; justify-content: space-between; margin-top: 2rem;">
				<Button type="button" kind="special" on:click={() => onAbort()}>
					<i class="fa-duotone fa-arrow-left" />
					<span style="padding-left: .5rem;"> Abbrechen </span>
				</Button>
				{#if onDelete !== undefined}
					<Button type="button" kind="danger" on:click={() => onDelete?.()}>
						<i class="fa-duotone fa-trash" />
						<span style="padding-left: .5rem;"> Löschen </span>
					</Button>
				{/if}
				<Button type="submit" kind="success" on:click={() => onSave({ ...$round })}>
					<i class="fa-duotone fa-floppy-disk" />
					<span style="padding-left: .5rem;"> Speichern </span>
				</Button>
			</div>
		</form>
	</div>
</div>

<pre>{JSON.stringify($round, null, 2)}</pre>

<style>
	.event-description {
		font-size: max(1em, 1rem);
		padding-block-end: 0;
	}
</style>
