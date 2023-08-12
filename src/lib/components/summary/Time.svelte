<script lang="ts">
	import { getDayInfos, labelMap } from '$lib/components/tables/times';
	import InteractionSymbol from '$lib/components/tables/InteractionSymbol.svelte';

	$: timeRangeSa = getDayInfos('SATURDAY');
	$: timeRangeSo = getDayInfos('SUNDAY');
</script>

<h4>Zeitplan</h4>

<h5 style="margin-top: .5rem; margin-bottom: 0">Samstag, 26. August 2023</h5>

<em> Anwesend: </em>

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
				{@const checked = true}
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

<h5 style="margin-top: .5rem; margin-bottom: 0">Sonntag, 27. August 2023</h5>

<em> Anwesend: </em>

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
				{@const checked = true}
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
