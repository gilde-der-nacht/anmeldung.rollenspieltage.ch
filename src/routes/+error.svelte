<script>
	import { page } from '$app/stores';
</script>

<h1>Leider ist ein Fehler aufgetreten</h1>
<p>
	Ein unerwarteter Fehler ist aufgetreten. Sollte dies erneut passieren, kontaktiere uns bitte
	umgehend per <a href="https://rollenspieltage.ch/kontakt/">Kontaktformular</a> oder
	<a href="https://rollenspieltage.ch/chat/">Discord (Chat)</a>.
</p>
<p><small>{$page.status}: {$page.error?.message}</small></p>
