<script lang="ts">
	import type { SvelteHTMLElements } from "svelte/elements";
	type $$restProps = Omit<SvelteHTMLElements["button"], "onClick">;

	export let clickHandler: (e: MouseEvent) => void = () => {};
	export let variant: "primary" | "inverted" | "text" | "outlined" = "primary";
	export let size: "sm" | "md" | "lg" = "md";
	const buttonClass = `btn btn-${variant} btn-${size}`;
</script>

<button {...$$restProps} class={`${buttonClass} ${$$restProps.class}`} on:click={clickHandler}>
	<slot />
</button>

<style>
	.btn {
		font-weight: 500;
		border-radius: 0.5rem;
		cursor: pointer;
		padding: 0.65em 1.5em;
		transition:
			background-color 0.3s,
			color 0.3s,
			transform 0.2s ease;
		&.btn-md {
			font-size: var(--font-size-body);
			padding-inline: 2em;
		}

		&.btn-lg {
			font-size: var(--font-size-lg);
			padding-inline: 2.5em;
		}

		&.btn-primary {
			background-color: var(--clr-primary);
			border: 2px solid var(--clr-primary);
			color: var(--clr-white);

			&:hover {
				background-color: var(--clr-bg);
				color: var(--clr-primary);
			}
		}

		&.btn-inverted {
			background-color: var(--clr-bg);
			border: 2px solid var(--clr-primary);
			color: var(--clr-primary);

			&:hover {
				background-color: var(--clr-primary);
				color: var(--clr-white);
			}
		}

		&.btn-text {
			background-color: transparent;
			border: 2px solid transparent;
			color: var(--clr-primary);

			&:hover {
				border: 2px solid var(--clr-primary);
			}
		}

		&.btn-outlined {
			background-color: transparent;
			border: 2px solid var(--clr-primary);
			color: var(--clr-primary);

			&:hover {
				background-color: var(--clr-primary);
				color: var(--clr-white);
			}
		}

		&:hover {
			transform: translateY(-0.2rem);
		}
	}
</style>
