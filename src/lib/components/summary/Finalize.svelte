<script lang="ts">
	import { confirm } from '$lib/shared/confirm';
	import type { AppState } from '$lib/shared/schema/app';
	import type { Progress } from '$lib/shared/schema/enums';
	import { progressMap } from '$lib/shared/stores/misc';
	import Alert from '../common/Alert.svelte';
	import Button from '../form/Button.svelte';
	import Loader from '../common/Loader.svelte';
	import { finalizeStore } from '$lib/shared/stores/finalizeStore';
	import type { Writable } from 'svelte/store';

	export let disabled: boolean;
	export let progressState: Writable<Progress>;
	export let appState: AppState;

	$: semanticState =
		$progressState === 'CONFIRMED'
			? 'success'
			: $progressState === 'RECONFIRMED'
			? 'success'
			: $progressState === 'INITIALIZED'
			? 'danger'
			: $progressState === 'IN_PROGRESS'
			? 'danger'
			: 'warning';

	$: progressText = progressMap[$progressState] ?? 'Unerwarteter Fehler';

	const f = finalizeStore;
	const onConfirm = async () => {
		f.update((prev) => ({ ...prev, isLoading: true, hasError: false }));
		const res = await confirm(appState);
		f.update((prev) => ({ ...prev, isLoading: false }));

		if (!res.success) {
			f.update((prev) => ({ ...prev, hasError: true }));
			return;
		}
		progressState.set(res.newProgress);
	};
</script>

<Alert type="special">
	{#if $f.isLoading}
		<span>
			<Loader />
			Daten werden übertragen ...
		</span>
	{:else}
		{#if $f.hasError}
			<span style="color: var(--clr-danger-11);">
				Leider ist ein unerwarteter Fehler aufgetreten. Bitte versuche erneut die Anmeldung
				abzuschicken. Sollte dies erneut passieren, kontaktiere uns bitte umgehend per <a
					href="https://rollenspieltage.ch/kontakt/">Kontaktformular</a
				>
				oder
				<a href="https://rollenspieltage.ch/chat/">Discord (Chat)</a>.
			</span>
		{/if}
		<div class="flex">
			<span style={`color: var(--clr-${semanticState}-11)`}
				>Status: <br /> <strong>{progressText}</strong></span
			>
			<Button type="button" {disabled} kind={disabled ? 'gray' : 'success'} on:click={onConfirm}>
				<span title={disabled ? 'Bitte zuerst alle Fehler beheben.' : ''}>
					{#if $progressState === 'INITIALIZED' || $progressState === 'IN_PROGRESS'}
						Anmeldung abschicken
					{:else}
						Änderungen abschicken
					{/if}
				</span>
			</Button>
		</div>
	{/if}
</Alert>

<style>
	.flex {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
	}
</style>
