<script lang="ts">
	import ButtonLink from "$components/common/ButtonLink.svelte";

	export let data;
</script>

<svelte:head>
	<title>Kennedy Home Videos | Videos Catalog</title>
	<meta property="og:title" content="Kennedy Home Videos | Videos Catalog" />
	<meta name="twitter:title" content="Kennedy Home Videos | Videos Catalog" />
</svelte:head>

<section class="container section-spacing">
	<header>
		<h1>Videos Catalog</h1>
	</header>
</section>

<section class="container section-spacing">
	{#await data}
		<i class="fa-solid fa-spinner fa-spin fa-2xl" />
	{:then}
		{#if data.videos}
			<table>
				<thead>
					<tr>
						<th>Video</th>
						<th>Added</th>
						<th>Action</th>
					</tr>
				</thead>
				{#each data.videos as video}
					<tr>
						<td>{video.Key?.split(".mp4")[0].split("/").pop()}</td>
						<td>{new Date(video.LastModified ?? "").toLocaleDateString()}</td>
						<td>
							<ButtonLink href={`/videos/${encodeURIComponent(video.Key ?? "")}`}>
								View
							</ButtonLink>
						</td>
					</tr>
				{/each}
			</table>
		{/if}
	{/await}
</section>

<style scoped>
	table {
		width: 100%;
		border-collapse: collapse;
		border-radius: 0.5em;
		overflow: hidden;
		box-shadow: 0 0 0 2px hsl(from var(--clr-accent) h s l / 0.2);
	}

	th {
		background-color: hsl(from var(--clr-accent) h s l / 0.5);
		font-size: 2rem;
		font-weight: 500;
	}

	th,
	td {
		text-align: left;
		padding: 0.5em;
	}

	td:not(:first-child),
	th:not(:first-child) {
		text-align: center;
	}

	tr {
		transition: background-color 0.2s ease-in-out;
	}

	tr:nth-child(even) {
		background-color: hsl(from var(--clr-primary) h s l / 0.1);
	}

	tr:hover {
		background-color: hsl(from var(--clr-accent) h s l / 0.05);
	}
</style>
