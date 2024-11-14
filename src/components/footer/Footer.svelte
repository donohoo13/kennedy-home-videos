<script lang="ts">
	import ButtonLink from "$components/common/ButtonLink.svelte";
	import LogoSolid from "$components/navbar/NavbarLogo.svelte";
</script>

<footer class="full-width-container main-footer section-spacing">
	<div class="container">
		<div class="logo-section">
			<LogoSolid height={60} />
			<p class="catch-phrase"><em>Kennedy Home Videos</em></p>
		</div>

		<div class="navigation">
			<ul>
				<p>Navigation</p>
				<li>
					<a href="/videos">Videos</a>
				</li>
				<li>
					<a href="/images">Images</a>
				</li>
			</ul>
		</div>

		<div class="copyright">
			<!-- ---- Links ---- -->
			<ul class="actions">
				<li>
					<a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
						<i class="fa-brands fa-linkedin-in fa-xl" />
						<span class="visually-hidden">Donohoo Dev, LLC LinkedIn profile</span>
					</a>
				</li>
				<li>
					<a rel="noopener noreferrer" target="_blank" href="https://x.com">
						<i class="fa-brands fa-x-twitter fa-xl" />
						<span class="visually-hidden">Donohoo Dev, LLC X profile</span>
					</a>
				</li>
				<li>
					<a href="https://github.com" target="_blank" rel="noopener noreferrer">
						<i class="fa-brands fa-github fa-xl" />
						<span class="visually-hidden">Donohoo Dev, LLC Github profile</span>
					</a>
				</li>
			</ul>

			<!-- ---- Copyright ---- -->
			<small>
				&copy; {new Date().getFullYear()} Donohoo Development, LLC. All rights reserved.
			</small>
		</div>
	</div>
</footer>

<style scoped>
	.main-footer {
		background-color: var(--clr-primary);
		color: var(--clr-white);
		margin-bottom: 0;

		& .catch-phrase {
			margin: 0.25rem 0;
			font-size: var(--font-size-caption);
			color: var(--clr-accent);
		}

		& > .container {
			display: grid;
			gap: 2rem;

			@media (min-width: 768px) {
				grid-template-columns: 1fr 1fr;
			}
		}
	}

	.logo-section {
		--clr-primary: var(--clr-white);
		--clr-bg: hsl(5 65% 33%);

		@media (min-width: 768px) {
			grid-column: 1/-1;
			order: 1;
		}
	}

	.navigation {
		display: none;
		font-size: var(--font-size-sm);

		& > ul {
			display: flex;
			flex-direction: column;
			gap: 1rem;
			margin: 0;

			& > p {
				margin: 0 0 0.5rem;
				text-decoration: underline;
				margin-bottom: 1rem;
			}

			& > li {
				& > a {
					color: var(--clr-white);

					&:hover {
						text-decoration: underline;
					}
				}
			}
		}

		@media (min-width: 768px) {
			display: flex;
			justify-content: flex-end;
			gap: 8rem;
			grid-column: 2;
			grid-row: 2;
		}
	}

	.copyright {
		& > .actions {
			display: flex;
			gap: 2rem;
			margin: 0;
			padding: 0;

			& > li {
				& > a {
					color: var(--clr-accent);

					&:hover {
						color: var(--clr-white);
					}
				}
			}
		}

		& > .links {
			display: flex;
			gap: 4rem;
			margin: 0 0 1rem;

			& > li {
				& > a {
					margin: 0;

					&:hover {
						text-decoration: underline;
					}
				}
			}
		}

		& > small {
			display: block;
			font-size: var(--font-size-caption);

			&:first-of-type {
				margin-top: 2rem;
				margin-bottom: 1rem;
			}
		}

		& > .attribution {
			font-size: var(--font-size-caption);

			& > a {
				color: var(--clr-accent);

				&:hover {
					text-decoration: underline;
				}
			}
		}

		@media (min-width: 768px) {
			grid-column: 1;
			grid-row: 2;
			align-self: flex-end;
			margin-top: 2rem;
		}
	}
</style>
