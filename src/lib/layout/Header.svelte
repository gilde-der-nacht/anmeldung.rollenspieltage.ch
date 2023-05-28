<script lang="ts">
	import theme from '$lib/shared/stores/theme';
	import { browser } from '$app/environment';

	function reflectPreference() {
		if (browser) {
			const [bodyEl] = document.querySelectorAll('body');
			bodyEl.setAttribute('color-scheme', $theme);
		}
	}
	reflectPreference();
	function toggleTheme() {
		theme.set($theme === 'dark' ? 'light' : 'dark');
	}
</script>

<header class="header">
	<input type="checkbox" id="mobile-navigation" class="hidden" />
	<label for="mobile-navigation" class="toggle-mobile-navigation" data-toggle-mobile-navigation="">
		<svg
			aria-hidden="true"
			focusable="false"
			data-icon="bars-staggered"
			class="fa-bars-staggered open-menu-container"
			role="img"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 512 512"
		>
			<g>
				<path
					style="opacity: 0.4;"
					fill="currentColor"
					d="M64 256C64 238.3 78.33 224 96 224H480C497.7 224 512 238.3 512 256C512 273.7 497.7 288 480 288H96C78.33 288 64 273.7 64 256z"
				/>
				<path
					fill="currentColor"
					d="M416 128H32C14.33 128 0 113.7 0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z"
				/>
			</g>
		</svg>
		<svg
			aria-hidden="true"
			focusable="false"
			class="fa-xmark close-menu-container"
			role="img"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 320 512"
		>
			<path
				fill="currentColor"
				d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"
			/>
		</svg>
	</label>
	<aside class="mobile-menu-container">
		<nav class="main-navigation" aria-label="main navigation">
			<ul>
				<li><a href="https://rollenspieltage.ch/">Startseite</a></li>
				<li><a href="/">Anmeldung</a></li>
				<li><a href="https://rollenspieltage.ch/neueinsteiger/">für Neueinsteiger</a></li>
				<li><a href="https://rollenspieltage.ch/familien/">für Familien</a></li>
				<li><a href="https://rollenspieltage.ch/spielleiterinnen/">für Spielleiter:innen</a></li>
				<li><a href="https://rollenspieltage.ch/veteranen/">für Veteranen</a></li>
				<li><a href="https://rollenspieltage.ch/kontakt/">Kontakt</a></li>
			</ul>
		</nav>

		<nav class="secondary-navigation" aria-label="secondary navigation">
			<ul>
				<li><a href="https://rollenspieltage.ch/chat/">Chat</a></li>
				<li><a href="https://rollenspieltage.ch/newsletter/">Newsletter</a></li>
				<li><a href="https://rollenspieltage.ch/verhaltenskodex/">Verhaltenskodex</a></li>
			</ul>
		</nav>

		<footer class="mobile-footer">
			<button class="button" data-toggle-theme="" aria-label={$theme} on:click={toggleTheme}>
				<span data-toggle-theme-to-light="" class={$theme === 'dark' ? '' : 'hidden'}>
					<svg
						class="svg-inline--fa fa-sun-bright"
						aria-hidden="true"
						focusable="false"
						data-prefix="fad"
						data-icon="sun-bright"
						role="img"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 512 512"
						data-fa-i2svg=""
						><g class="fa-duotone-group"
							><path
								class="fa-secondary"
								fill="currentColor"
								d="M108.9 74.97c-9.344-9.375-24.56-9.375-33.94 0s-9.375 24.56 0 33.94l45.25 45.28c4.672 4.688 10.83 7.031 16.97 7.031S149.5 158.9 154.2 154.2c9.375-9.375 9.375-24.56 0-33.93L108.9 74.97zM256 0C242.8 0 232 10.75 232 24v64C232 101.3 242.8 112 256 112s24-10.75 24-24v-64C280 10.75 269.3 0 256 0zM112 256c0-13.25-10.75-24-24-24h-64C10.75 232 0 242.8 0 256s10.75 24 24 24h64C101.3 280 112 269.3 112 256zM374.8 161.2c6.141 0 12.3-2.344 16.97-7.031l45.25-45.28c9.375-9.375 9.375-24.56 0-33.94s-24.59-9.375-33.94 0l-45.25 45.28c-9.375 9.375-9.375 24.56 0 33.93C362.5 158.9 368.7 161.2 374.8 161.2zM256 400c-13.25 0-24 10.75-24 24v64C232 501.3 242.8 512 256 512s24-10.75 24-24v-64C280 410.8 269.3 400 256 400zM120.2 357.8l-45.25 45.28c-9.375 9.375-9.375 24.56 0 33.94c4.688 4.688 10.83 7.031 16.97 7.031s12.3-2.344 16.97-7.031l45.25-45.28c9.375-9.375 9.375-24.56 0-33.93S129.6 348.4 120.2 357.8zM488 232h-64c-13.25 0-24 10.75-24 24s10.75 24 24 24h64C501.3 280 512 269.3 512 256S501.3 232 488 232zM391.8 357.8c-9.344-9.375-24.56-9.372-33.94 .0031s-9.375 24.56 0 33.93l45.25 45.28c4.672 4.688 10.83 7.031 16.97 7.031s12.28-2.344 16.97-7.031c9.375-9.375 9.375-24.56 0-33.94L391.8 357.8z"
							/><path
								class="fa-primary"
								fill="currentColor"
								d="M256 144C194.1 144 144 194.1 144 256c0 61.86 50.14 112 112 112s112-50.14 112-112C368 194.1 317.9 144 256 144z"
							/></g
						></svg
					><!-- <i class="fa-duotone fa-sun-bright"></i> -->
				</span>
				<span data-toggle-theme-to-dark="" class={$theme === 'light' ? '' : 'hidden'}>
					<svg
						class="svg-inline--fa fa-moon-stars"
						aria-hidden="true"
						focusable="false"
						data-prefix="fad"
						data-icon="moon-stars"
						role="img"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 512 512"
						data-fa-i2svg=""
						><g class="fa-duotone-group"
							><path
								class="fa-secondary"
								fill="currentColor"
								d="M288 63.1l12.42 29.78c.6094 1.225 2.211 2.219 3.578 2.219s2.967-.9941 3.576-2.219l12.42-29.78l29.79-12.42C351 50.97 352 49.36 352 47.1c0-1.365-.9922-2.967-2.211-3.576l-29.79-12.42l-12.42-29.79c-.6094-1.227-2.209-2.217-3.576-2.217s-2.969 .9902-3.578 2.217l-12.42 29.79L258.2 44.42c-1.217 .6094-2.209 2.211-2.209 3.576c0 1.359 .9922 2.971 2.209 3.58L288 63.1zM507.6 216.9L448 192l-24.88-59.63C421.8 129.8 419 127.1 416 127.1s-5.75 1.75-7.125 4.375L384 192l-59.63 24.88C321.8 218.3 320 221 320 224s1.75 5.75 4.375 7.125L384 256l24.88 59.63C410.3 318.3 413 320 416 320s5.75-1.75 7.125-4.375L448 256l59.63-24.88C510.3 229.8 512 227 512 224S510.3 218.3 507.6 216.9z"
							/><path
								class="fa-primary"
								fill="currentColor"
								d="M332.3 426.4c-93.13 17.75-178.5-53.63-178.5-147.6c0-54.25 29-104 76-130.9c7.375-4.125 5.45-15.12-2.8-16.62C108.7 109.4 0 200 0 320c0 106 85.76 192 191.8 192c59.25 0 113.2-26.79 148.9-71.04C346.1 434.5 340.3 424.8 332.3 426.4z"
							/></g
						></svg
					><!-- <i class="fa-duotone fa-moon-stars"></i> -->
				</span>
			</button>
		</footer>
	</aside>

	<div class="site-name">
		<a href="https://rollenspieltage.ch/">
			<h1>Luzerner Rollenspieltage</h1>

			<h2>26. + 27. August 2023</h2>
		</a>
	</div>
	<div class="site-logo">
		<a href="https://rollenspieltage.ch/">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				viewBox="0 0 1000 1000"
				height="75"
				width="75"
				class="rst-logo"
			>
				<defs>
					<style>
						.rst-gradient-1 {
							fill: url('#rst-gradient-1');
						}

						.rst-gradient-2 {
							fill: url('#rst-gradient-2');
						}

						.rst-gradient-3 {
							fill: url('#rst-gradient-3');
						}

						.rst-gradient-4 {
							fill: url('#rst-gradient-4');
						}
					</style>
					<linearGradient
						id="rst-gradient-1"
						x1="89.92"
						y1="210.49"
						x2="233.63"
						y2="331.07"
						gradientUnits="userSpaceOnUse"
					>
						<stop offset="0" stop-color="var(--clr-purple-light)" />
						<stop offset="0.8" stop-color="var(--clr-purple-base)" />
					</linearGradient>
					<linearGradient
						id="rst-gradient-2"
						x1="566.62"
						y1="735.16"
						x2="696.22"
						y2="735.16"
						xlink:href="#rst-gradient-1"
					/>
					<linearGradient
						id="rst-gradient-3"
						x1="156.5"
						y1="479.39"
						x2="717.44"
						y2="479.39"
						gradientUnits="userSpaceOnUse"
					>
						<stop offset="0" stop-color="var(--clr-red-light)" />
						<stop offset="0.8" stop-color="var(--clr-red-base)" />
					</linearGradient>
					<linearGradient
						id="rst-gradient-4"
						x1="247.21"
						y1="521.26"
						x2="882.39"
						y2="521.26"
						gradientUnits="userSpaceOnUse"
					>
						<stop offset="0.2" stop-color="var(--clr-red-base)" />
						<stop offset="1" stop-color="var(--clr-red-light)" />
					</linearGradient>
				</defs>
				<g>
					<path
						class="rst-fill-2"
						d="M820,153a125.14,125.14,0,0,0-176.78,0L501.77,294.38h0a20,20,0,0,0,28.28,28.28h0L671.47,181.24a85.09,85.09,0,0,1,120.21,0l56.57,56.57,28.28-28.29Z"
					/>
					<path
						class="rst-fill-2"
						d="M756.33,237.81h0l-38.89-38.89h0a20,20,0,0,0-28.29,28.28h0L728,266.09h0a20,20,0,0,0,28.29-28.28Z"
					/>
					<path
						class="rst-fill-2"
						d="M156.77,869.33l0-.06,38.79-123.42-38.16-12L118.53,857.6h0a20,20,0,1,0,38.14,12h0Z"
					/>
					<path
						class="rst-fill-2"
						d="M275.49,810.56a20,20,0,0,0-20.13-4.92h0L131.61,844.52l12,38.16L267,843.89l.05,0,.27-.08h0a20,20,0,0,0,8.15-33.22Z"
					/>
					<path
						class="rst-fill-1"
						d="M332.06,223.67a19.91,19.91,0,0,0-8.51-5l-180.3-53L132,204l180.2,53a20,20,0,0,0,19.9-33.29Z"
					/>
					<path
						class="rst-gradient-1"
						d="M209.83,359.44l-53-180.29a20,20,0,1,0-38.34,11.39l53,180.19Z"
					/>
					<path
						class="rst-fill-1"
						d="M738.65,566.61l-28.29-28.28-81.31,81.32h0a20,20,0,0,0,28.28,28.28h0Z"
					/>
					<path
						class="rst-fill-1"
						d="M600.76,704.5l-28.28-28.29-81.32,81.32h0a20,20,0,0,0,28.29,28.29h0Z"
					/>
					<path
						class="rst-gradient-2"
						d="M696.22,771.67l-95.46-95.46h0a20,20,0,0,0-28.28,28.29h0L667.94,800Z"
					/>
					<path
						class="rst-fill-1"
						d="M752.79,715.11h0L703.3,665.61h0A20,20,0,0,0,675,693.89h0l49.49,49.49h0a20,20,0,0,0,28.28-28.28Z"
					/>
					<path
						class="rst-fill-1"
						d="M547.74,664.34a20,20,0,1,0-35.9-17.57,221.89,221.89,0,0,0-27.36,106.87q0,10.38,1,20.72l39.71-5q-.66-7.8-.67-15.72a180.93,180.93,0,0,1,23.31-89.28Z"
					/>
					<path
						class="rst-fill-1"
						d="M738.65,538.33a19.86,19.86,0,0,0-11.71-5.69v0q-10.22-.95-20.47-1A221.46,221.46,0,0,0,599,559.36l18,35.73a181,181,0,0,1,89.53-23.45c5.19,0,10.35.23,15.47.66h0a20,20,0,0,0,16.7-34Z"
					/>
					<path
						class="rst-fill-1"
						d="M798.75,732.78a79.74,79.74,0,0,0-56.57-23.43c-1.74,0-3.49.08-5.23.19l3.5,39.85c.57,0,1.15,0,1.73,0a40,40,0,1,1-39.95,39h-.33a20,20,0,1,0-39.68-.29,80,80,0,1,0,136.53-55.29Z"
					/>
					<polygon
						class="rst-fill-1"
						points="469.32 384.27 333.13 224.82 302.71 250.8 440.95 412.64 469.32 384.27"
					/>
					<path
						class="rst-fill-1"
						d="M623,564.24h0l-17.55-20.55-28.37,28.37,15.51,18.16h0c.34.39.68.79,1.05,1.16A20,20,0,0,0,623,564.24Z"
					/>
					<path
						class="rst-fill-1"
						d="M203.63,349.88h0a20,20,0,0,0-27.12,29.34c.37.37.77.71,1.16,1h0L337.1,516.49l28.37-28.37Z"
					/>
					<polygon
						class="rst-fill-1"
						points="496.51 652.65 517.06 670.21 543.04 639.79 524.88 624.28 496.51 652.65"
					/>
					<path
						class="rst-gradient-3"
						d="M717.44,227.2l-28.29-28.28L162.36,725.71h0A20,20,0,0,0,190.64,754h0Z"
					/>
					<path
						class="rst-gradient-4"
						d="M876.53,209.52a20,20,0,0,0-28.28,0h0l-601,601,28.28,28.29,601-601h0A20,20,0,0,0,876.53,209.52Z"
					/>
				</g>
			</svg>
		</a>
	</div>
</header>
