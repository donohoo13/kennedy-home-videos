<script lang="ts">
	import { enhance } from "$app/forms";
	import Button from "$components/common/Button.svelte";

	export let form;
</script>

<svelte:head>
	<title>Kennedy Home Videos | Authenticate</title>
	<meta property="og:title" content="Kennedy Home Videos | Authenticate" />
	<meta name="twitter:title" content="Kennedy Home Videos | Authenticate" />
</svelte:head>

<section class="container section-spacing">
	<header>
		<h1>Authentication Required</h1>
		<p class="subtitle">Please enter the password to access the desired content.</p>
	</header>
</section>

<section class="container section-spacing">
	<form class="form" method="POST" use:enhance>
		<div class="form-group">
			<label for="password">
				<span> Password </span>
				<input
					data-1p-ignore
					type="password"
					id="password"
					value=""
					name="password"
					required
				/>
			</label>
		</div>
		<Button type="submit">Submit</Button>
	</form>

	{#if form?.message}
		<p class="submission-msg" class:error={!form?.success}>{form.message}</p>
	{/if}
</section>

<style>
	.submission-msg {
		margin-top: 2rem;
	}

	.submission-msg.error {
		color: var(--clr-error);
	}
</style>
