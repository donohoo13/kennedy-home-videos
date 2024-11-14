<script lang="ts">
	import ButtonLink from "$components/common/ButtonLink.svelte";

	export let data;
</script>

<svelte:head>
	<title>Kennedy Home Videos | {data.video.split("/").pop()?.replace(".mp4", "")}</title>
	<meta
		property="og:title"
		content="Kennedy Home Videos | {data.video.split('/').pop()?.replace('.mp4', '')}"
	/>
	<meta
		name="twitter:title"
		content="Kennedy Home Videos | {data.video.split('/').pop()?.replace('.mp4', '')}"
	/>
</svelte:head>

<section class="container section-spacing">
	<header>
		<ButtonLink href="/videos">View All</ButtonLink>
		<h1>{data.video.split("/").pop()?.replace(".mp4", "")}</h1>
	</header>
</section>

<section class="container section-spacing">
	{#await data}
		<i class="fa-solid fa-spinner fa-spin fa-2xl" />
	{:then}
		{#if data.signedUrl}
			<video src={data.signedUrl} controls autoplay>
				<track kind="captions" />
			</video>
		{/if}
	{/await}
</section>

<style scoped>
	video {
		width: 100%;
	}
</style>
