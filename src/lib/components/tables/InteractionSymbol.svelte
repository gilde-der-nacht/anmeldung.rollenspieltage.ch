<script lang="ts">
	import type { InteractionType } from './interactions';

	export let type: InteractionType = 'NONE';
</script>

<span style={`display: ${type === 'DELETE' ? 'initial' : 'none'};`}>
	<i class="fa-duotone fa-trash-xmark" />
</span>

<span style={`display: ${type === 'CHECKED' ? 'initial' : 'none'};`}>
	<i class="fa-duotone fa-square-check" />
</span>

<span style={`display: ${type === 'PRE_CHECKED' ? 'initial' : 'none'};`}>
	<i class="fa-duotone fa-square-check" />
</span>
