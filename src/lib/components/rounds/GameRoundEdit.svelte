<script lang="ts">
	import type { AgeGroup, GameLength, GameRound, Genre } from '$lib/shared/schema/shared';
	import { writable } from 'svelte/store';
	import Button from '../form/Button.svelte';
	import TextInput from '../form/TextInput.svelte';
	import RadioGroup from '../form/RadioGroup.svelte';
	import NumberInput from '../form/NumberInput.svelte';
	import Checkbox from '../form/Checkbox.svelte';

	export let id: string = crypto.randomUUID();
	export let title = '';
	export let system = '';
	export let duration: GameLength = 'long_rounds';
	export let player_count_min = 3;
	export let player_count_max = 4;
	export let genres: Genre[] = [];
	export let age_groups: AgeGroup[] = ['CHILD', 'TEEN', 'ADULT'];
	export let active = true;

	export let onSave: (gr: GameRound) => void;
	export let onDelete: (() => void) | undefined = undefined;
	export let onAbort: () => void;

	const round = writable<GameRound>({
		title,
		system,
		duration,
		player_count_min,
		player_count_max,
		genres: [...genres],
		age_groups: [...age_groups],
		active,
		id,
	});

	$: isNew = onDelete === undefined;

	const _genres = writable({
		fantasy: $round.genres.includes('fantasy'),
		science_fiction: $round.genres.includes('science_fiction'),
		horror: $round.genres.includes('horror'),
		crime: $round.genres.includes('crime'),
		modern: $round.genres.includes('modern'),
	});
	_genres.subscribe((g) => {
		const activeGenres: Genre[] = [];
		if (g.fantasy) {
			activeGenres.push('fantasy');
		}
		if (g.science_fiction) {
			activeGenres.push('science_fiction');
		}
		if (g.horror) {
			activeGenres.push('horror');
		}
		if (g.crime) {
			activeGenres.push('crime');
		}
		if (g.modern) {
			activeGenres.push('modern');
		}
		$round.genres = activeGenres;
	});

	const _age_groups = writable({
		child: $round.age_groups.includes('CHILD'),
		teen: $round.age_groups.includes('TEEN'),
		adult: $round.age_groups.includes('ADULT'),
	});
	_age_groups.subscribe((g) => {
		const activeGroups: AgeGroup[] = [];
		if (g.child) {
			activeGroups.push('CHILD');
		}
		if (g.teen) {
			activeGroups.push('TEEN');
		}
		if (g.adult) {
			activeGroups.push('ADULT');
		}
		$round.age_groups = activeGroups;
	});
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
					<Checkbox bind:state={$_genres.fantasy}>Fantasy</Checkbox>
					<Checkbox bind:state={$_genres.science_fiction}>Science Fiction</Checkbox>
					<Checkbox bind:state={$_genres.horror}>Horror</Checkbox>
					<Checkbox bind:state={$_genres.crime}>Krimi</Checkbox>
					<Checkbox bind:state={$_genres.modern}>Modern</Checkbox>
				</div>
			</fieldset>

			<fieldset>
				<legend>Altersgruppen</legend>
				<div class="checkbox-list">
					<Checkbox bind:state={$_age_groups.child}>6 bis 9 Jahre</Checkbox>
					<Checkbox bind:state={$_age_groups.teen}>10 bis 15 Jahre</Checkbox>
					<Checkbox bind:state={$_age_groups.adult}>16+ Jahre</Checkbox>
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
