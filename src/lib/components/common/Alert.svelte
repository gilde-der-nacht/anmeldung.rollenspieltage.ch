<script lang="ts">
	export let type: "danger" | "gray" | "success" | "special" = "gray";
</script>

<div class={`box-${type}`}>
	<span>
		<p>
			<slot />
		</p>
	</span>
</div>
