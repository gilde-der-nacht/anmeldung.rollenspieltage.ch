<script lang="ts">
	import Button from '../form/Button.svelte';
	import { type AppState, pageMap } from '$lib/shared/schema/app';
	import type { Writable } from 'svelte/store';

	export let appState: Writable<AppState>;

	$: currentPage = pageMap[$appState.page];
	$: prev = currentPage.prev;
	$: next = currentPage.next;
</script>

<footer class="nav-footer">
	{#if prev !== undefined}
		{@const prev2 = prev}
		<Button
			type="button"
			kind="special"
			on:click={() => appState.update((p) => ({ ...p, page: prev2.page }))}
		>
			<div class="flex">
				<i class="fa-duotone fa-arrow-left" />
				<div style="text-align: left;">
					<small>Vorherige Seite</small>
					<br />
					<span class="label">{prev2.label}</span>
				</div>
			</div>
		</Button>
	{:else}
		<div style="opacity: 0;" />
	{/if}
	{#if next !== undefined}
		{@const next2 = next}
		<Button
			type="button"
			kind="special"
			on:click={() => appState.update((p) => ({ ...p, page: next2.page }))}
		>
			<div class="flex">
				<div style="text-align: right;">
					<small>Nächste Seite</small>
					<br />
					<span class="label">{next2.label}</span>
				</div>
				<i class="fa-duotone fa-arrow-right" />
			</div>
		</Button>
	{/if}
</footer>

<style>
	.nav-footer {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin-block: 1.5rem;
	}

	.flex {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		align-items: center;
	}

	small {
		font-weight: normal;
	}

	.label {
		text-transform: uppercase;
	}
</style>
