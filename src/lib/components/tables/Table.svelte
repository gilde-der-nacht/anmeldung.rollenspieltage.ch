<script lang="ts">
	import type { daySchemaGeneral } from '$lib/shared/schema/server';
	import type { z } from 'zod';
	import InteractionSymbol from './InteractionSymbol.svelte';

	export let data: z.infer<typeof daySchemaGeneral>;
</script>

<div class="table-container">
	<table style="min-width: 100%;">
		<thead>
			<tr>
				<th>Startzeit</th>
				<th>Programm</th>
				<th>Bemerkung</th>
			</tr>
		</thead>
		<tbody>
			{#each Array.from(data) as block}
				{@const index = block[0]}
				{@const entry = block[1]}
				{#if entry !== null}
					<tr class={entry.type.toLowerCase()}>
						<td>
							<InteractionSymbol type="CHECKED" />
						</td>
						<td>{index} Uhr</td>
						<td>{entry}</td>
						<td>Flohmarkt offen</td>
					</tr>
				{/if}
			{/each}
		</tbody>
	</table>
</div>
