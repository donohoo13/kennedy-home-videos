<script>
	import Navbar from "$components/navbar/Navbar.svelte";
	import Footer from "$components/footer/Footer.svelte";
</script>

<div class="app-layout">
	<div class="content-grid navbar">
		<Navbar />
	</div>

	<main class="content-grid">
		<slot />
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
</style>
