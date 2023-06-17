<script lang="ts">
	import type { AppState } from '$lib/shared/schema/app';
	import type { Writable } from 'svelte/store';
	import { validateState } from '$lib/shared/validation';
	import { getDayInfos, labelMap } from '$lib/components/tables/times';
	import InteractionSymbol from '$lib/components/tables/InteractionSymbol.svelte';
	import { summaryHelper } from '$lib/components/summary/summaryHelper';
	import Alert from '../common/Alert.svelte';
	import { localizeEatPreference } from '$lib/shared/stores/misc';

	export let appState: Writable<AppState>;
	$: v = validateState($appState);
	$: h = summaryHelper($appState);
	$: timeRangeSa = getDayInfos('SATURDAY');
	$: timeRangeSo = getDayInfos('SUNDAY');
</script>

<h4>Zeitplan</h4>

{#if v.time.EITHER || v.time.SATURDAY || v.time.SUNDAY}
	<Alert type="danger">Bitte korrigiere die Fehler auf der Seite "Zeit".</Alert>
{/if}

{#if $appState.days.includes('SATURDAY')}
	<h5 style="margin-top: .5rem; margin-bottom: 0">Samstag, 26. August 2023</h5>

	<em>
		Anwesend: {h.names.SATURDAY}
	</em>

	<div class="table-container">
		<table style="min-width: 100%;">
			<thead>
				<tr>
					<th>Anwesenheit</th>
					<th>Startzeit</th>
					<th>Programm</th>
				</tr>
			</thead>
			<tbody>
				{#each timeRangeSa.range.range as block}
					{@const type = timeRangeSa.details[block] ?? 'GAME_BLOCK_CONT'}
					{@const checked = h.showTick('SATURDAY', block)}
					<tr class={type.toLowerCase() + (checked ? ' checked' : '')}>
						<td class={checked ? 'checked' : ''}>
							{#if checked}
								<InteractionSymbol type="CHECKED" />
							{/if}
						</td>
						<td>{block} Uhr</td>
						<td>{labelMap[type]}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}

{#if $appState.days.includes('SUNDAY')}
	<h5 style="margin-top: .5rem; margin-bottom: 0">Samstag, 26. August 2023</h5>

	<em>
		Anwesend: {h.names.SUNDAY}
	</em>

	<div class="table-container">
		<table style="min-width: 100%;">
			<thead>
				<tr>
					<th>Anwesenheit</th>
					<th>Startzeit</th>
					<th>Programm</th>
				</tr>
			</thead>
			<tbody>
				{#each timeRangeSo.range.range as block}
					{@const type = timeRangeSo.details[block] ?? 'GAME_BLOCK_CONT'}
					{@const checked = h.showTick('SUNDAY', block)}
					<tr class={type.toLowerCase() + (checked ? ' checked' : '')}>
						<td class={checked ? 'checked' : ''}>
							{#if checked}
								<InteractionSymbol type="CHECKED" />
							{/if}
						</td>
						<td>{block} Uhr</td>
						<td>{labelMap[type]}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}

{#if $appState.eat_preference !== 'nothing_selected'}
	<h5 style="margin-top: .5rem; margin-bottom: 0">Verpflegung</h5>

	<div class="check">
		<span class="success">
			<InteractionSymbol type="CHECKED" />
		</span>
		<span>{localizeEatPreference[$appState.eat_preference]}</span>
	</div>
{/if}

<style>
	.lunch,
	.dinner {
		background-color: var(--clr-11);
		color: var(--clr-2);
		--row-bg: var(--clr-11);
	}

	.success {
		color: var(--clr-success-11);
	}

	td.checked {
		color: var(--clr-success-10);
	}

	tr.checked {
		background: linear-gradient(90deg, var(--clr-success-5), var(--row-bg, transparent) 35%);
	}
</style>
