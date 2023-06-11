<script lang="ts">
	import { pageList, pageMap } from '$lib/shared/schema/complex/navigation';
	import type { AppState } from '$lib/shared/schema/app';
	import type { Writable } from 'svelte/store';

	export let appState: Writable<AppState>;
	$: currentPage = $appState.page;
</script>

<h4>Navigation</h4>
<ul class="steps">
	{#each pageList as page}
		{@const curr = pageMap[page]}
		<li class={`steps-segment ${currentPage === curr.curr.page ? 'active' : ''}`}>
			<span class="steps-marker" />
			<div class="steps-content">
				<button
					class={`link ${currentPage === curr.curr.page ? 'active' : ''}`}
					on:click={() => {
						appState.update((prev) => ({ ...prev, page: curr.curr.page }));
						document.getElementById('main-title')?.scrollIntoView(true);
					}}
				>
					{curr.curr.label}
				</button>
			</div>
		</li>
	{/each}
</ul>

<style>
	.steps {
		list-style: none;
		padding: 0;
		margin: 0;
		font-size: 0.75rem;
		margin-top: 2rem;
		padding-inline-start: 0.5rem;
	}

	@media (min-width: 1000px) {
		.steps {
			position: sticky;
			top: 150px;
		}
	}

	.steps-segment {
		display: block;
		position: relative;
	}

	.steps-segment:not(:last-child) {
		min-height: 4em;
	}

	.steps-segment:not(:last-child)::after {
		bottom: -0.24rem;
		left: calc(0.75rem - (0.1em));
		top: 1.26rem;
		width: 0.2em;
		content: ' ';
		display: block;
		position: absolute;
	}

	.steps-segment::after {
		background-color: var(--clr-11);
	}

	.steps-marker {
		height: 1.5rem;
		width: 1.5rem;
		background-color: var(--clr-11);
		color: lightgrey;
		align-items: center;
		display: flex;
		border-radius: 50%;
		font-weight: 700;
		justify-content: center;
		position: relative;
		overflow: visible;
	}

	.active > .steps-marker {
		outline: 3px solid var(--clr-accent-1);
		outline-offset: 0.25rem;
	}

	.steps-content {
		margin-left: calc(1rem + 0.5em);
		margin-top: -2rem;
		padding-left: 1em;
		padding-bottom: 1em;
	}

	.link {
		border-left-width: 0;
		border-right-width: 0;
		border-top-width: 0;
		background-color: transparent;
	}

	.active {
		border-bottom-color: var(--clr-accent-1);
		color: var(--clr-accent-2);
	}
</style>
