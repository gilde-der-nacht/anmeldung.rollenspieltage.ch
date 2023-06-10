<script lang="ts">
	import { getDayInfos, labelMap } from './times';

	export let day: 'SATURDAY' | 'SUNDAY';
	$: timeRange = getDayInfos(day);
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
			{#each timeRange.range as block}
				{@const type = timeRange.details[block]}
				<tr class={type.toLowerCase()}>
					<td><i class="fa-duotone fa-square-check" /></td>
					<td>{block} Uhr</td>
					<td>{labelMap[type]}</td>
					<td>Flohmarkt offen</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.dinner,
	.lunch {
		background-color: var(--clr-11);
		color: var(--clr-2);
	}
</style>
