<script lang="ts">
	export let type: 'submit' | 'button' | 'reset';
	export let kind: 'accent' | 'success' | 'special' | 'gray' = 'accent';
	export let disabled: boolean = false;
</script>

<button {type} class={`button-${kind}`} {disabled} on:click>
	<slot />
</button>

<style>
	[disabled] {
		cursor: not-allowed;
	}
</style>
