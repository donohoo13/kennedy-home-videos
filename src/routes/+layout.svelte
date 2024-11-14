<script>
	import Navbar from "$components/navbar/Navbar.svelte";
	import Footer from "$components/footer/Footer.svelte";
	import { navigating } from "$app/stores";

	let navigatingValue = false;
	let displayLoadingIndicator = false;

	navigating.subscribe((value) => {
		navigatingValue = !!value;

		if (navigatingValue) {
			setTimeout(() => {
				if (navigatingValue) {
					displayLoadingIndicator = true;
				}
			}, 100);
		} else {
			displayLoadingIndicator = false;
		}
	});
</script>

<div class="app-layout">
	<div class="content-grid navbar">
		<Navbar />
	</div>

	<main
		class="content-grid"
		style="align-content: {displayLoadingIndicator ? 'stretch' : 'flex-start'}"
	>
		{#if displayLoadingIndicator}
			<div class="loading-indicator full-width-container">
				<i class="fa-solid fa-spinner fa-spin" style="font-size: 5rem" />
			</div>
		{:else}
			<slot />
		{/if}
	</main>

	<div class="content-grid footer">
		<Footer />
	</div>
</div>

<style scoped>
	.app-layout {
		position: relative;
		min-height: 100vh;
		min-height: 100dvh;
		display: grid;
		grid-template-rows: var(--nav-height) 1fr auto;
		margin: 0;
		padding: 0;
	}

	.navbar {
		position: -webkit-sticky;
		position: sticky;
		top: 0;
		z-index: 100;
		isolation: auto;
		align-self: start;
	}

	.loading-indicator {
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
