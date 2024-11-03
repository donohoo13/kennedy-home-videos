<script lang="ts">
	import { fade } from "svelte/transition";
	import { isMobileMenuOpen, toggleMobileMenu } from "$stores/mobile-menu.store";
</script>

<button on:click={() => toggleMobileMenu()} class="mobile-menu-button">
	<svg
		aria-hidden="true"
		focusable="false"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 338 512"
		width="24"
		height="24"
	>
		{#if !$isMobileMenuOpen}
			<path
				d="M0 88C0 74.7 10.7 64 24 64l400 0c13.3 0 24 10.7 24 24s-10.7 24-24 24L24 112C10.7 112 0 101.3 0 88zM0 248c0-13.3 10.7-24 24-24l400 0c13.3 0 24 10.7 24 24s-10.7 24-24 24L24 272c-13.3 0-24-10.7-24-24zM448 408c0 13.3-10.7 24-24 24L24 432c-13.3 0-24-10.7-24-24s10.7-24 24-24l400 0c13.3 0 24 10.7 24 24z"
				fill="currentColor"
				in:fade={{ duration: 150 }}
				out:fade={{ duration: 150 }}
			/>
		{:else}
			<path
				d="M345 137c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-119 119L73 103c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l119 119L39 375c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l119-119L311 409c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-119-119L345 137z"
				fill="currentColor"
				in:fade={{ duration: 150 }}
				out:fade={{ duration: 150 }}
			/>
		{/if}
	</svg>
</button>

<style scoped>
	.mobile-menu-button {
		color: var(--clr-nav-text);
		background-color: transparent;
		border: none;
		cursor: pointer;
		font-size: 1.5rem;

		@media screen and (min-width: 768px) {
			display: none;
		}
	}
</style>
