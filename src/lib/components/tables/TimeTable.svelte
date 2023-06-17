<script lang="ts">
	import type { Writable } from 'svelte/store';
	import { getDayInfos, labelMap } from '$lib/components/tables/times';
	import type { AppState } from '$lib/shared/schema/app';
	import { getInteractions } from '$lib/components/tables/interactions';
	import InteractionSymbol from '$lib/components/tables/InteractionSymbol.svelte';
	import Alert from '$lib/components/common/Alert.svelte';
	import type { Day } from '$lib/shared/schema/enums';

	export let day: Day;
	export let appState: Writable<AppState>;
	$: timeRange = getDayInfos(day);
	const i = getInteractions(day, appState);
	$: interactionDetails = i.interactionDetails;
	$: dayHasActiveHours = i.dayHasActiveHours;
</script>

<div class="table-container">
	<table
		style="min-width: 100%;"
		on:mouseenter={() => i.onMouseEnter(0)}
		on:mouseleave={i.onMouseLeave}
	>
		<thead>
			<tr>
				<th
					class={`pointer ${$dayHasActiveHours ? 'active' : 'disabled'} reset`}
					on:click={i.resetDay}
				>
					<i
						class="fa-duotone fa-trash-can-check"
						title={`${day === 'SATURDAY' ? 'Samstag' : 'Sonntag'} zurücksetzen`}
					/>
				</th>
				<th>Startzeit</th>
				<th>Programm</th>
				<th>Bemerkung</th>
			</tr>
		</thead>
		<tbody>
			{#each timeRange.range.range as block}
				{@const type = timeRange.details[block] ?? 'GAME_BLOCK_CONT'}
				<tr
					class={type.toLowerCase() + ' pointer ' + $interactionDetails[block]?.toLowerCase()}
					on:mouseenter={() => i.onMouseEnter(block)}
					on:mouseleave={i.onMouseLeave}
					on:click={() => i.onClick(block)}
				>
					<td class={$interactionDetails[block]?.toLowerCase()}>
						<InteractionSymbol type={$interactionDetails[block]} />
					</td>
					<td>{block} Uhr</td>
					<td>{labelMap[type]}</td>
					<td>Flohmarkt offen</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

{#if !$dayHasActiveHours}
	<Alert type="danger"
		>Wähle mindestens einen Zeitblock aus, indem du diesen per Klick in der Tabelle markierst.</Alert
	>
{/if}

<style>
	td:first-child {
		min-width: 3rem;
	}

	.lunch,
	.dinner {
		background-color: var(--clr-11);
		color: var(--clr-2);
		--row-bg: var(--clr-11);
	}

	.pointer:hover {
		cursor: pointer;
	}

	td.checked {
		color: var(--clr-success-10);
	}

	td.delete {
		color: var(--clr-danger-10);
	}

	.reset.active:hover {
		color: var(--clr-danger-11);
	}

	.reset.disabled {
		color: var(--clr-gray-8);
		cursor: not-allowed;
	}

	tr.checked {
		background: linear-gradient(90deg, var(--clr-success-5), var(--row-bg, transparent) 35%);
	}

	tr.delete {
		background: linear-gradient(90deg, var(--clr-danger-5), var(--row-bg, transparent) 35%);
	}

	tr.pre_checked {
		background: linear-gradient(90deg, var(--clr-gray-5), var(--row-bg, transparent) 35%);
	}

	tr.pre_checked .pre_checked {
		color: white;
	}
</style>
