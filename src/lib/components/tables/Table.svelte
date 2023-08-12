<script lang="ts">
	import type { daySchemaGeneral } from '$lib/shared/schema/server';
	import type { z } from 'zod';
	import InteractionSymbol from './InteractionSymbol.svelte';
	import type { TableView } from './util';

	export let data: TableView[];
	const numberOfRows = data.length;
</script>

<div class="table-container">
	<table style="min-width: 100%;">
		<thead>
			<tr>
				<th />
				<th>Startzeit</th>
				<th>Programm</th>
				<th>Bemerkung</th>
			</tr>
		</thead>
		<tbody>
			{#each Array.from(data) as block, index}
				{@const available = block.type !== 'NOTHING'}
				<tr class={entry.type.toLowerCase() + (available ? ' checked' : '')}>
					<td class={available ? ' checked' : ''}>
						{#if available}
							<InteractionSymbol type="CHECKED" />
						{/if}
					</td>
					<td>{hour} Uhr</td>
					<td>{entry.type}</td>
					{#if index === 0}
						<td rowspan={numberOfRows}>Flohmarkt offen</td>
					{/if}
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
