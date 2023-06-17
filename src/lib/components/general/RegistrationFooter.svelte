<script lang="ts">
	import Alert from '$lib/components/common/Alert.svelte';
	import type { SaveState } from '$lib/shared/save';
	import type { Progress } from '$lib/shared/schema/enums';
	import { progressMap } from '$lib/shared/stores/misc';
	import type { Writable } from 'svelte/store';

	export let progressState: Writable<Progress>;
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

	$: rightSemanticState =
		$progressState === 'CONFIRMED'
			? 'SUCCESS'
			: $progressState === 'RECONFIRMED'
			? 'SUCCESS'
			: $progressState === 'INITIALIZED'
			? 'ERROR'
			: $progressState === 'IN_PROGRESS'
			? 'ERROR'
			: 'WARNING';

	$: progressText = progressMap[$progressState] ?? 'Unerwarteter Fehler';
</script>

<div class="registration-footer-wrapper">
	<footer class={'registration-footer'}>
		<Alert
			type={rightSemanticState === 'SUCCESS'
				? 'success'
				: rightSemanticState === 'ERROR'
				? 'danger'
				: 'warning'}
		>
			<div class="flex">
				{#if aggregatedState === 'SAVING'}
					<span style="color:var(--clr-warning-11)"> Wird gespeichert... </span>
				{:else if aggregatedState === 'SAVED'}
					<span style="color:var(--clr-success-11)"> Erfolgreich gespeichert. </span>
				{:else if aggregatedState === 'ERROR'}
					<span style="color:var(--clr-danger-11)"> Fehler beim Speichern </span>
				{:else}
					<span />
				{/if}
				<span>Status: <strong>{progressText}</strong></span>
			</div>
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

	.flex {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
</style>
