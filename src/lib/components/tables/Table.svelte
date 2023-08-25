<script lang="ts">
	import type { TableData } from '$lib/shared/schema/table.types';
	import Button from '../form/Button.svelte';
	import InteractionSymbol from './InteractionSymbol.svelte';

	export let data: TableData;
	const numberOfRows = Object.entries(data).length;
</script>

<div class="table-container">
	<table style="min-width: 100%;">
		<thead>
			<tr>
				<th style="min-inline-size: 3rem;" />
				<th>Zeit</th>
				<th colspan="2">Programm</th>
				<th>Bemerkung</th>
			</tr>
		</thead>
		<tbody>
			{#each Object.entries(data) as block, index}
				{@const [hour, entry] = block}
				{@const type = entry.label.type}
				{@const checked = entry.isParticipating && type !== 'AD' && type !== 'NONE_AD'}
				<tr
					class:food-time={entry.isFoodTime}
					class:checked
					class:no-border={!entry.border}
					class:nothing={type === 'EMPTY' || type === 'AD' || type === 'NONE_AD'}
				>
					<td class:checked>
						{#if checked}
							<InteractionSymbol type="CHECKED" />
						{/if}
					</td>
					{#if type !== 'NONE' && type !== 'NONE_AD'}
						<td rowspan={entry.rowspan} class="hour-cell">
							<div class="hour">
								{hour}
						
								<span class="until">- {Number(hour) + entry.rowspan} </span>
							</div>
						</td>
					{/if}

					{#if type === 'EMPTY'}
						<td colspan="2">
							{#if hour === '12'}
								Mittagessen
							{:else if hour === '19'}
								Nachtessen
							{/if}
						</td>
					{:else if type === 'SIMPLE'}
						<td rowspan={entry.rowspan} colspan="2">
							<em>
								{entry.label.title.trim()}
							</em>
							{#if entry.label.description !== undefined}
								<p>
									<small>
										{entry.label.description.trim()}
									</small>
								</p>
							{/if}
						</td>
					{:else if type === 'COMPLEX'}
						<td rowspan={entry.rowspan} id={entry.label.id} colspan="2">
							<p>
								<strong>{entry.label.title.trim()}</strong>
								{#if entry.label.system !== null && entry.label.system.trim() !== entry.label.title.trim()}
									<em>({entry.label.system.trim()})</em>
								{/if}
							</p>
							<p>
								<small>
									Spielleiter:in &mdash; {entry.label.game_master.trim()}
								</small>
							</p>
							<p>
								<small>
									Spieler:innen &mdash; {entry.label.players}
								</small>
							</p>
						</td>
					{:else if type === 'AD'}
						<td rowspan={entry.rowspan} colspan="2">
							<small><em>Noch Plätze frei:</em></small>
							<p><strong>Blood on the Clocktower</strong></p>
							<p class="my-3">
								<small>
									"Blood on the Clocktower" ist ein Spiel voller Intrigen und Rätsel, Lügen und
									Logik, Deduktion und Täuschung. Blood on the Clocktower ist eine einzigartige
									Spielerfahrung, bei der jeder Spieler einen individuellen guten oder bösen
									Charakter erhält.
								</small>
							</p>
							<p class="my-3">
								<small>
									"Blood on the Clocktower" ist <em>kein</em> klassisches Rollenspiel. Teilnehmeranzahl
									ist auf 12 Spieler:innen begrenzt. Sichere dir einen Platz:
								</small>
							</p>
							<a href="https://rollenspieltage.ch/kontakt/" target="_blank" style="border: 0">
								<Button kind="success" type="button">zum Kontaktformular</Button>
							</a>
						</td>
					{:else if type === 'DOUBLE'}
						<td rowspan={entry.rowspan}>
							<em>
								{entry.label.first.title.trim()}
							</em>
							{#if entry.label.first.description !== undefined}
								<p>
									<small>
										{entry.label.first.description.trim()}
									</small>
								</p>
							{/if}
							<p><small>{entry.label.first.name.trim()}</small></p>
						</td>
						<td rowspan={entry.rowspan} id={entry.label.second.id} class="double">
							<p>
								<strong>{entry.label.second.title.trim()}</strong>
								{#if entry.label.second.system !== null && entry.label.second.system.trim() !== entry.label.second.title.trim()}
									<em>({entry.label.second.system.trim()})</em>
								{/if}
							</p>
							<p>
								<small>
									Spielleiter:in &mdash; {entry.label.second.game_master.trim()}
								</small>
							</p>
							<p>
								<small>
									Spieler:innen &mdash; {entry.label.second.players}
								</small>
							</p>
						</td>
					{/if}

					{#if index === 0}
						<td
							rowspan={numberOfRows}
							style="min-inline-size: 9ch; max-inline-size: 12ch;"
							class="fleemarket"
						>
							<p>
								<strong>Flohmarkt offen</strong>
							</p>
							<small>
								Neben den Rollen&shy;spiel&shy;runden wird es auch die Möglichkeit geben Spiele und
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
	.food-time .until {
		color: var(--clr-gray-8);
	}
	td.checked {
		color: var(--clr-success-10);
	}
	tr.checked {
		background: linear-gradient(90deg, var(--clr-success-5), var(--row-bg, transparent) 10%);
	}
	.my-3 {
		margin-block: 1rem;
	}
	.no-border td:first-child {
		border-bottom: 0;
	}
	tr:last-child {
		border-bottom: 1px solid var(--clr-6);
	}
	tr.nothing:not(.food-time):hover {
		background-color: var(--clr-2) !important;
	}
	.fleemarket {
		background-color: var(--clr-11);
		color: var(--clr-2);
		vertical-align: top;
	}
	.nothing:not(.food-time) {
		background-color: var(--clr-2);
	}
	.double {
		border-left: 3px dotted var(--clr-6);
	}
	.until {
		font-size: 0.75em;
			color: var(--clr-gray-10);
	}
	.hour {
		line-height: 1;
		padding-inline-start: 0.75em;
		white-space: nowrap;
	}
	td {
		vertical-align: middle;
	}
	.hour-cell {
		padding: 0;
	}
</style>
