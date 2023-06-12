<script lang="ts">
	import { writable } from 'svelte/store';
	import Button from '../form/Button.svelte';
	import GameRoundEdit from './GameRoundEdit.svelte';
	import type { GameRound } from '$lib/shared/schema/complex/gameRoundSchema';
	import { scrollUp } from '$lib/shared/scroll';

	const isEditing = writable(false);
	export let saveNewRound: (gr: GameRound) => void;
</script>

{#if $isEditing}
	<GameRoundEdit
		onAbort={() => {
			isEditing.set(false);
			scrollUp();
		}}
		onSave={(gr) => {
			saveNewRound(gr);
			isEditing.set(false);
			scrollUp();
		}}
	/>
{:else}
	<Button type="button" kind="success" on:click={() => isEditing.set(true)}>
		<i class="fa-duotone fa-grid-2-plus" />
		<span style="padding-left: .5rem"> Neue Runde erfassen </span>
	</Button>
{/if}
