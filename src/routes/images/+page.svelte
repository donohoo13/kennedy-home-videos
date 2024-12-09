<script lang="ts">
	import ButtonLink from "$components/common/ButtonLink.svelte";
	import Tooltip from "$components/common/Tooltip.svelte";

	export let data;
	let search = "";
	let selectedImage: {
		signedUrl: string;
		key: string;
	} | null = null;

	$: {
		if (search) {
			data.filteredImages = data.images.filter((image) =>
				image.key.toLowerCase().includes(search.toLowerCase())
			);
		} else {
			data.filteredImages = data.images;
		}
	}
</script>

<svelte:head>
	<title>Kennedy Home Videos | Images Catalog</title>
	<meta property="og:title" content="Kennedy Home Videos | Images Catalog" />
	<meta name="twitter:title" content="Kennedy Home Videos | Images Catalog" />
</svelte:head>

<section class="container section-spacing">
	<header>
		<h1>Images Catalog</h1>
	</header>
</section>

<section class="container section-spacing">
	{#await data}
		<i class="fa-solid fa-spinner fa-spin fa-2xl" />
	{:then}
		{#if data.images}
			<label>
				<input type="search" placeholder="Search" bind:value={search} />
			</label>
			<div class="grid">
				{#each data.filteredImages as image}
					<Tooltip text={image.key.split("/").pop()?.replace(".webp", "") ?? ""}>
						<img
							src={image.signedUrl}
							alt={image.key}
							loading="lazy"
							width={400}
							height={400}
							on:click={() => {
								selectedImage = image;
							}}
						/>
					</Tooltip>
				{/each}
			</div>
		{/if}
	{/await}
</section>

<dialog open={selectedImage !== null}>
	<h2>{selectedImage?.key.split("/").pop()?.replace(".webp", "") ?? ""}</h2>
	<img src={selectedImage?.signedUrl} alt={selectedImage?.key} />
	<button
		on:click={() => {
			selectedImage = null;
		}}>Close</button
	>
</dialog>

<style scoped>
	:global(body:has(dialog[open])) {
		overflow: hidden;
		overflow-y: hidden;
		overflow-x: hidden;
		-webkit-overflow-scrolling: none;
		overscroll-behavior: none;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		justify-content: center;
		align-items: center;
		gap: 1em;
		overflow: hidden;

		@media (min-width: 768px) {
			grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
		}
	}

	label {
		display: flex;
		align-items: center;
		gap: 0.5em;
		margin-bottom: 1em;
		position: sticky;
		top: calc(var(--nav-height) + 0.25em);
		z-index: 10;
	}

	input {
		width: 100%;
		padding: 1em;
		border-radius: 0.5em;
		border: 2px solid hsl(from var(--clr-accent) h s l / 0.8);
	}

	.grid img {
		width: 100%;
		max-height: 75dvh;
		height: auto;
		object-fit: cover;
		border-radius: 0.5em;
		box-shadow: 0 0 0.5em hsl(from var(--clr-accent) h s l / 0.5);
		transition: transform 0.2s ease-in-out;
		cursor: pointer;
		margin-bottom: 1em;

		&:hover {
			transform: scale(1.025);
		}
	}

	dialog[open] {
		position: fixed;
		top: var(--nav-height);
		left: 0;
		width: 100dvw;
		height: calc(100dvh - var(--nav-height));
		padding: 20px;
		background-color: hsl(from var(--clr-accent) h s l / 0.1);
		backdrop-filter: blur(2rem);
		border: none;
		display: flex;
		flex-direction: column;
		gap: 1em;
		transition:
			box-shadow 0.3s,
			backdrop-filter 0.3s,
			background-color 0.3s;
		overflow: hidden;
		align-items: center;
		justify-content: center;
		z-index: 20;

		& h2 {
			font-size: 2.25rem;
			font-weight: bold;
			text-align: center;
		}

		& img {
			width: 100%;
			height: auto;
			max-height: calc(100dvh - var(--nav-height) - 10em);
			border-radius: 0.5em;
			object-fit: contain;
			border-radius: 0.5em;
		}

		& button {
			background-color: var(--clr-primary);
			width: 50%;
			border-radius: 0.5em;
			padding: 0.5em 1em;
			border: none;
			cursor: pointer;
			font-size: 1.2em;
			font-weight: bold;

			&:hover {
				background-color: var(--clr-accent);
			}
		}
	}
</style>
