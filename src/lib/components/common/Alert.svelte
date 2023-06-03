<script lang="ts">
	export let type: 'danger' | 'gray' | 'success' | 'special' = 'gray';
</script>

<div class={`box-${type}`}>
	<p>
		<slot />
	</p>
</div>
