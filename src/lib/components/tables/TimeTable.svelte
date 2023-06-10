<script lang="ts">
	import type { Day } from '$lib/shared/schema/shared';
	import type { Writable } from 'svelte/store';
	import { getDayInfos, labelMap } from './times';
	import type { AppState } from '$lib/shared/schema/app';
	import { getInteractions } from './interactions';
	import InteractionSymbol from './InteractionSymbol.svelte';

	export let day: Day;
	export let appState: Writable<AppState>;
	$: timeRange = getDayInfos(day);
	const i = getInteractions(day, appState);
	$: isHovering = i.mouseIsHovering;
	$: interactionDetails = i.interactionDetails;
</script>

<div class="table-container">
	<table
		style="min-width: 100%;"
		on:mouseenter={() => i.onMouseEnter(0)}
		on:mouseleave={i.onMouseLeave}
	>
		<thead>
			<tr>
				<th class="pointer" on:click={i.resetDay}>
					<i class="fa-duotone fa-arrow-rotate-left" />
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
					class={type.toLowerCase() + ' pointer'}
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

<style>
	.lunch,
	.dinner {
		background-color: var(--clr-11);
		color: var(--clr-2);
	}

	.pointer:hover {
		cursor: pointer;
	}

	.checked {
		color: var(--clr-success-10);
	}

	.lunch .checked,
	.dinner .checked {
		color: var(--clr-success-6);
	}

	.delete {
		color: var(--clr-danger-10);
	}

	.lunch .delete,
	.dinner .delete {
		color: var(--clr-danger-6);
	}
</style>
