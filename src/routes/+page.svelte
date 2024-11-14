<script lang="ts">
	import ButtonLink from "$components/common/ButtonLink.svelte";
</script>

<svelte:head>
	<title>Kennedy Home Videos</title>
	<meta name="description" content="" />
	<meta property="og:title" content="" />
	<meta property="og:description" content="" />
	<meta name="og:url" content="https://www." />
	<meta name="twitter:title" content="" />
	<meta name="twitter:description" content="" />
	<meta name="twitter:url" content="https://www." />
	<meta name="keywords" content="" />
</svelte:head>

<section class="container section-spacing">
	<header>
		<h1 id="welcome">Welcome to Kennedy Home Videos</h1>
		<p class="subtitle">A collection of videos and images from the Kennedy family.</p>
	</header>
</section>

<section class="container section-spacing cards">
	<div class="card">
		<div class="card-header">
			<h2>Videos</h2>
			<i class="fa-regular fa-video fa-2xl" />
		</div>
		<p>View the full collection of Kennedy family videos.</p>
		<ButtonLink href="/videos">View Videos</ButtonLink>
	</div>

	<div class="card">
		<div class="card-header">
			<h2>Images</h2>
			<i class="fa-regular fa-image fa-2xl" />
		</div>
		<p>View the full collection of Kennedy family images.</p>
		<ButtonLink href="/images">View Images</ButtonLink>
	</div>
</section>

<style scoped>
	#welcome {
		color: var(--clr-text);
	}

	.cards {
		display: grid;
		gap: 4rem;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	}

	.card {
		background-color: hsl(from var(--clr-accent) h s l / 0.75);
		padding: 2rem;
		border-radius: 0.5rem;

		& > .card-header {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 1rem;

			& > h2 {
				margin: 0;
			}
		}

		& > p {
			margin-bottom: 6rem;
		}
	}
</style>
