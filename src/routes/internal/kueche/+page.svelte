<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>Kueche</h1>

<pre><code>{JSON.stringify(data.kuecheEntries, null, 2)}</code></pre>
