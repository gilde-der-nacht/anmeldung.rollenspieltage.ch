<script lang="ts">
	export let label: string;
	export let type: 'submit' | 'button' | 'reset';
</script>

<button {type} class="button-accent">{label}</button>
