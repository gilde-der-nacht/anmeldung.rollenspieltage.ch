<script lang="ts">
	import type { SaveState } from '$lib/shared/save';
	import Alert from '../common/Alert.svelte';

	export let saveState: SaveState | 'WAITING';
	let aggregatedState: SaveState | 'WAITING' = 'WAITING';
	$: {
		aggregatedState = saveState;
		setTimeout(() => {
			if (saveState !== 'ERROR') {
				aggregatedState = 'WAITING';
			}
		}, 5_000);
	}
</script>

<div class="registration-footer-wrapper">
	<footer class="registration-footer">
		<Alert
			type={aggregatedState === 'SAVED'
				? 'success'
				: aggregatedState === 'ERROR'
				? 'danger'
				: 'gray'}
		>
			<span class="center">
				{#if aggregatedState === 'SAVING'}
					Wird gespeichert...
				{:else if aggregatedState === 'SAVED'}
					Erfolgreich gespeichert.
				{:else if aggregatedState === 'ERROR'}
					Fehler beim Speichern
				{:else}
					Gespeichert.
				{/if}
			</span>
		</Alert>
	</footer>
</div>

<style>
	.registration-footer-wrapper {
		padding-block-start: 1rem;
	}

	.registration-footer {
		padding-block-end: 1rem;
	}

	@media (min-width: 600px) {
		.registration-footer-wrapper {
			position: sticky;
			bottom: 0;
			margin-inline: -1rem;
		}

		.registration-footer {
			background-color: var(--clr-2);
		}
	}
</style>
