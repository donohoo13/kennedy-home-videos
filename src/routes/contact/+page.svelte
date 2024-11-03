<script lang="ts">
	import { enhance } from "$app/forms";
	import Button from "$components/common/Button.svelte";

	export let form;
</script>

<svelte:head>
	<title>Contact</title>
	<meta name="description" content="" />
	<meta property="og:title" content="" />
	<meta property="og:description" content="" />
	<meta name="og:url" content="https://www." />
	<meta name="twitter:title" content="" />
	<meta name="twitter:description" content="" />
	<meta name="twitter:url" content="https://www." />
	<meta name="keywords" content="" />
</svelte:head>

<div class="container section-spacing">
	<header class="">
		<h1 id="contact">Contact Us</h1>
	</header>
</div>

<div class="article-container section-spacing">
	<form class="form" method="POST" action="?/submitForm" use:enhance>
		<div class="form-group">
			<label for="full_name">
				<span> Full Name </span>
				<input
					type="text"
					id="full_name"
					name="full_name"
					value={form?.lastSubmission?.full_name ?? ""}
					required
				/>
			</label>

			<label for="email">
				<span> Email Address </span>
				<input
					type="email"
					id="email"
					name="email"
					value={form?.lastSubmission?.email ?? ""}
					required
				/>
			</label>
		</div>

		<label for="description">
			<span> Please describe your message: </span>
			<textarea
				id="description"
				name="description"
				value={form?.lastSubmission?.description ?? ""}
				rows="5"
				required
			/>
		</label>

		<label for="honeypot" class="visually-hidden">
			<span>Leave this field blank</span>
			<input type="text" id="honeypot" name="honeypot" />
		</label>
		<Button type="submit">Submit</Button>
	</form>

	{#if form?.message}
		<p class="submission-msg" class:error={!form?.success}>{form.message}</p>
	{/if}
</div>

<style>
	#contact {
		color: var(--clr-text);
	}

	.submission-msg {
		margin-top: 4rem;
		font-size: var(--font-size-lg);
		color: var(--clr-success);

		&.error {
			color: var(--clr-error);
		}
	}
</style>
