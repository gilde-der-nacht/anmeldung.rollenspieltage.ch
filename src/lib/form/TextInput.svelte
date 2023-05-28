<script lang="ts">
	export let label: string;
	export let name: string;
	export let initValue: string = '';
	export let placeholder: string = '';
	export let required: boolean = false;
</script>

<label>{label} <input type="text" value={initValue} {name} {placeholder} {required} /> </label>
