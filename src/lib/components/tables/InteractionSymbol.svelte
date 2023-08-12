<script lang="ts">
	type InteractionType = 'NONE' | 'DELETE' | 'PRE_CHECKED' | 'CHECKED';

	export let type: InteractionType = 'NONE';
</script>

<span style={`display: ${type === 'DELETE' ? 'initial' : 'none'};`} title="Diese Zeiten löschen">
	<i class="fa-duotone fa-square-check" />
</span>

<span style={`display: ${type === 'CHECKED' ? 'initial' : 'none'};`}>
	<i class="fa-duotone fa-square-check" />
</span>

<span style={`display: ${type === 'PRE_CHECKED' ? 'initial' : 'none'};`} title="Zeiten hinzufügen">
	<i class="fa-duotone fa-square-check" />
</span>
