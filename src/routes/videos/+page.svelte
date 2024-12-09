<script lang="ts">
	import ButtonLink from "$components/common/ButtonLink.svelte";

	export let data;
	let sortKey: "name" | "date" = "name";
	let sortDirection: "asc" | "desc" = "asc";
	let search = "";

	const capitalize = (str: string) => str.replace(/^[a-z]/, (p) => p.toUpperCase());
	const getPeople = (tags: { Key: string; Value: string }[]) => {
		const people =
			tags
				.find((tag) => tag.Key === "people")
				?.Value.split("_")
				.map(capitalize)
				.join(", ") ?? "";
		return people;
	};
	const getDate = (tags: { Key: string; Value: string }[]) => {
		const date = tags.find((tag) => tag.Key === "date")?.Value;
		return date ? new Date(date).toLocaleDateString() : "";
	};

	function handleSort(key: "name" | "date") {
		if (sortKey === key) {
			sortDirection = sortDirection === "asc" ? "desc" : "asc";
		} else {
			sortKey = key;
			sortDirection = "asc";
		}
	}

	$: {
		if (sortKey === "name") {
			data.videos = data.videos.sort((a, b) => {
				if (sortDirection === "asc") {
					return a.Key.localeCompare(b.Key);
				} else {
					return b.Key.localeCompare(a.Key);
				}
			});
		} else if (sortKey === "date") {
			data.videos = data.videos.sort((a, b) => {
				const aDate = new Date(
					a.Tags.find((t) => t.Key === "date")?.Value ?? ""
				)?.getTime();
				const bDate = new Date(
					b.Tags.find((t) => t.Key === "date")?.Value ?? ""
				)?.getTime();
				if (sortDirection === "asc") {
					if (isNaN(aDate)) {
						return 1;
					}
					if (isNaN(bDate)) {
						return -1;
					}
					return aDate - bDate;
				} else {
					if (isNaN(aDate)) {
						return 1;
					}
					if (isNaN(bDate)) {
						return -1;
					}
					return bDate - aDate;
				}
			});
		}
	}

	$: {
		if (search) {
			data.filteredVideos = data.videos.filter((video) =>
				video.Key.toLowerCase().includes(search.toLowerCase())
			);
		} else {
			data.filteredVideos = data.videos;
		}
	}
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
			<label>
				<input type="search" placeholder="Search" bind:value={search} />
			</label>
			<table>
				<thead>
					<tr>
						<th on:click={() => handleSort("name")}>
							Name
							<span
								class:hidden={sortKey !== "name"}
								class:icon-flip={sortDirection === "desc"}
							>
								<i class="fa-solid fa-arrow-up" />
							</span>
						</th>
						<th>People</th>
						<th on:click={() => handleSort("date")}>
							Date
							<span
								class:hidden={sortKey !== "date"}
								class:icon-flip={sortDirection === "desc"}
							>
								<i class="fa-solid fa-arrow-up" />
							</span>
						</th>
						<th>Action</th>
					</tr>
				</thead>
				{#each data.filteredVideos as video}
					<tr>
						<td>{video.Key?.split(".mp4")[0].split("/").pop()}</td>
						<td>{getPeople(video.Tags)}</td>
						<td>{getDate(video.Tags)}</td>
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

		&:has(span) {
			cursor: pointer;
		}

		& > span {
			display: inline-block;
			margin-left: 0.5em;
		}
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

	.icon-flip {
		transform: rotate(180deg);
	}

	label {
		position: sticky;
		top: calc(var(--nav-height) + 0.25em);
		z-index: 10;
		display: flex;
		align-items: center;
		gap: 0.5em;
		margin-bottom: 1em;
	}

	input {
		width: 100%;
		padding: 1em;
		border-radius: 0.5em;
		border: 2px solid hsl(from var(--clr-accent) h s l / 0.2);
	}
</style>
