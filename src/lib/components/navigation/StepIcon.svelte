<script lang="ts">
	import type { PageState } from '$lib/shared/schema/complex/navigation';

	export let type: PageState;
</script>

<span style={`display: ${type === 'DONE' ? 'initial' : 'none'};`} title="Erledigt">
	<i class="fa-duotone fa-check" />
</span>

<span
	style={`display: ${type === 'ERRORS' ? 'initial' : 'none'};`}
	title="Diese Seite hat noch Fehler."
	class="danger"
>
	<i class="fa-duotone fa-exclamation" />
</span>

<span
	style={`display: ${type === 'TODO' ? 'initial' : 'none'};`}
	title="Diese Seite wurde noch nie besucht"
>
	<i class="fa-duotone fa-question" /></span
>

<style>
	.danger {
		color: var(--clr-danger-12);
	}
</style>
