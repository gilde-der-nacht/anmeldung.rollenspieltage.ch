<script lang="ts">
	import { get, writable } from 'svelte/store';
	import Button from '../form/Button.svelte';
	import TextInput from '../form/TextInput.svelte';
	import RadioGroup from '../form/RadioGroup.svelte';
	import NumberInput from '../form/NumberInput.svelte';
	import Checkbox from '../form/Checkbox.svelte';
	import type { GameRound } from '$lib/shared/schema/complex/gameRoundSchema';
	import { getDefaultGameRound, notEmpty } from './roundUtil';
	import _ from 'lodash';
	import { createGenresStore } from '$lib/shared/stores/genres';
	import { createAgeGroupStore } from '$lib/shared/stores/ageGroup';
	import { isNonEmptyString } from '../form/Validation';
	import Alert from '../common/Alert.svelte';
	import FormFieldError from '../form/FormFieldError.svelte';

	export let gameRound: GameRound = getDefaultGameRound();
	const round = writable<GameRound>(_.clone(gameRound));

	export let onSave: (gr: GameRound) => void;
	export let onDelete: ((gr: GameRound) => void) | undefined = undefined;
	export let onAbort: () => void;

	$: isNew = onDelete === undefined;

	const genres = createGenresStore(round);
	const age_groups = createAgeGroupStore(round);

	const isValidated = writable(false);

	const validateAndSave = () => {
		isValidated.set(true);
		if (!hasErrors) {
			onSave(_.clone(get(round)));
		}
	};

	type Field = 'TITLE' | 'SYSTEM' | 'PLAYER_COUNT' | 'GENRES' | 'AGE_GROUP';
	type ErrorList = {
		[Key in Field]: null | string;
	};
	$: errors = {
		TITLE: isNonEmptyString($round.title) ? null : 'Titel darf nicht leer sein.',
		SYSTEM: isNonEmptyString($round.system) ? null : 'System darf nicht leer sein.',
		PLAYER_COUNT:
			$round.player_count_min <= $round.player_count_max
				? null
				: 'Das Minimum an Spieleranzahl darf nicht grösser sein als das Maximum.',
		GENRES: $round.genres.length > 0 ? null : 'Wähle bitte mindestens ein Genre aus.',
		AGE_GROUP:
			$round.age_groups.length > 0 ? null : 'Wähle bitte mindestens eine Altersgruppe aus.',
	} satisfies ErrorList;

	$: hasErrors = Object.values(errors).reduce((acc, curr) => {
		if (curr === null) {
			return acc;
		}
		return true;
	}, false);
</script>

<div class="event-entry">
	<h1 class="event-title">{isNew ? 'Neue Runde erfassen' : 'Runde anpassen'}</h1>
	<div class="event-description content">
		<form on:submit|preventDefault={validateAndSave}>
			<TextInput
				label="Titel"
				bind:value={$round.title}
				name="title"
				error={{
					condition: () => $isValidated && errors.TITLE !== null,
					message: errors.TITLE ?? '',
				}}
			/>

			<TextInput
				label="System"
				bind:value={$round.system}
				name="system"
				error={{
					condition: () => $isValidated && errors.SYSTEM !== null,
					message: errors.SYSTEM ?? '',
				}}
			/>
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
			{#if $isValidated && errors.PLAYER_COUNT !== null}
				<FormFieldError>
					{errors.PLAYER_COUNT}
				</FormFieldError>
			{/if}

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
			{#if $isValidated && errors.GENRES !== null}
				<FormFieldError>
					{errors.GENRES}
				</FormFieldError>
			{/if}

			<fieldset>
				<legend>Altersgruppen</legend>
				<div class="checkbox-list">
					<Checkbox bind:state={$age_groups.child}>6 bis 9 Jahre</Checkbox>
					<Checkbox bind:state={$age_groups.teen}>10 bis 15 Jahre</Checkbox>
					<Checkbox bind:state={$age_groups.adult}>16+ Jahre</Checkbox>
				</div>
			</fieldset>
			{#if $isValidated && errors.AGE_GROUP !== null}
				<FormFieldError>
					{errors.AGE_GROUP}
				</FormFieldError>
			{/if}

			{#if $isValidated && hasErrors}
				<Alert type="danger">
					Es wurden Fehler im Formular entdeckt. Bitte korrigiere diese, bevor die Spielrunde
					gespeichert werden kann.
				</Alert>
			{/if}

			<div style="display: flex; justify-content: space-between; margin-top: 2rem;">
				<Button type="button" kind="special" on:click={() => onAbort()}>
					<i class="fa-duotone fa-arrow-left" />
					<span style="padding-left: .5rem;"> Abbrechen </span>
				</Button>
				{#if onDelete !== undefined}
					<Button type="button" kind="danger" on:click={() => onDelete?.(_.clone($round))}>
						<i class="fa-duotone fa-trash" />
						<span style="padding-left: .5rem;"> Löschen </span>
					</Button>
				{/if}
				<Button type="submit" kind="success">
					{#if isNew}
						<i class="fa-duotone fa-square-plus" />
						<span style="padding-left: .5rem;">Erstellen</span>
					{:else}
						<i class="fa-duotone fa-floppy-disk" />
						<span style="padding-left: .5rem;">Speichern</span>
					{/if}
				</Button>
			</div>
		</form>
	</div>
</div>

<style>
	.event-description {
		font-size: max(1em, 1rem);
		padding-block-end: 0;
	}
</style>
