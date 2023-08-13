<script lang="ts">
	import type { TableData } from '$lib/shared/schema/table.types';
	import InteractionSymbol from './InteractionSymbol.svelte';

	export let data: TableData;
	const numberOfRows = Object.entries(data).length;
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
			{#each Object.entries(data) as block, index}
				{@const [hour, entry] = block}
				{@const type = entry.label.type}
				<tr class:food-time={entry.isFoodTime} class:checked={entry.isParticipating}>
					<td class:checked={entry.isParticipating}>
						{#if entry.isParticipating}
							<InteractionSymbol type="CHECKED" />
						{/if}
					</td>
					<td>{hour} Uhr</td>

					{#if type === 'EMPTY'}
						<td>
							{#if hour === '12'}
								Mittagessen
							{:else if hour === '19'}
								Nachtessen
							{/if}
						</td>
					{:else if type === 'SIMPLE'}
						<td rowspan={entry.rowspan}>
							<em>
								{entry.label.simple}
							</em>
						</td>
					{:else if type === 'COMPLEX'}
						<td rowspan={entry.rowspan} id={entry.label.id}>
							<p>
								<strong>{entry.label.title}</strong>
								{#if entry.label.system !== null}
									<em>({entry.label.system})</em>
								{/if}
							</p>
							<p>
								<small>
									Spielleiter:in &mdash; {entry.label.game_master}
								</small>
							</p>
							<p>
								<small>
									Spieler:innen &mdash; {entry.label.players}
								</small>
							</p>
						</td>
					{:else if type === 'DOUBLE'}
						<td>TODO</td>
					{/if}

					{#if index === 0}
						<td rowspan={numberOfRows} style="max-inline-size: 20ch;">
							<p>
								<strong>Flohmarkt offen</strong>
							</p>
							<small>
								Neben den Rollenspielrunden wird es auch die Möglichkeit geben Spiele und
								Spielzubehör auf dem Flohmarkt zu kaufen und zu verkaufen.
							</small>
						</td>
					{/if}
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

	td.checked {
		color: var(--clr-success-10);
	}

	tr.checked {
		background: linear-gradient(90deg, var(--clr-success-5), var(--row-bg, transparent) 10%);
	}
</style>
