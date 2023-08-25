<script lang="ts">
	import type { Day } from '$lib/shared/common';
	import { toRange } from '$lib/shared/rangeUtil';
	import type { TableColumn, TableEntry } from '../../../routes/internal/view.types';

	export let tableData: TableColumn[];
	export let day: Day;
	const endHour = day === 'sa' ? 24 : 17;

	function getCells(col: TableColumn, hour: number): TableEntry[] {
		return col.cols
			.map((c) => c.find((c2) => c2.hour === hour))
			.filter((c3): c3 is TableEntry => c3 !== undefined);
	}
</script>

<div class="table-container">
	<table style="min-width: 100%;">
		<thead>
			<tr>
				<th>Zeit</th>
				{#each tableData as col}
					<th colspan={col.cols.length} class="double">{col.label}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each toRange(10, endHour).range as hour}
				<tr class:food-time={hour === 12 || hour === 19}>
					<td>{hour} Uhr</td>
					{#each tableData as col}
						{@const cells = getCells(col, hour)}
						{#each cells as cell}
							{#if cell.kind === 'empty'}
								<td rowspan={cell.rowspan} class="nothing double" />
							{:else if cell.kind === 'filled'}
								<td rowspan={cell.rowspan} id={cell.id} class="double">{cell.name}</td>
							{/if}
						{/each}
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.food-time {
		background-color: var(--clr-11);
		color: var(--clr-2);
		--row-bg: var(--clr-11);
	}

	tr:last-child {
		border-bottom: 1px solid var(--clr-6);
	}

	.nothing:not(.food-time) {
		background-color: var(--clr-2);
	}
	.double {
		border-left: 3px dotted var(--clr-6);
	}

	td {
		vertical-align: middle;
	}
</style>
