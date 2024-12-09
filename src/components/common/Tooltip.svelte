<script lang="ts">
	export let text: string;
</script>

<div class="tooltip" data-text={text}>
	<slot />
</div>

<!-- <Box
            data-text={title}
            sx={(theme) => ({
                "position": "relative",
                "display": "inline-block",
                "&:before": {
                    content: "attr(data-text)",
                    position: "absolute",
                    padding: theme.spacing(0.75),
                    borderRadius: theme.spacing(1),
                    border: `1px solid ${theme.palette.divider}`,
                    fontSize: theme.typography.overline.fontSize,
                    background: theme.palette.background.paperAlternate,
                    color: theme.palette.text.primary,
                    textAlign: "center",
                    display: "none",
                    transition: "all 0.3s ease",
                    whiteSpace: "normal",
                    zIndex: 1000,
                    pointerEvents: "none",
                    width,
                    ...placementStyles,
                },
                "&:hover:before": {
                    display: "flex",
                    justifyContent: "center",
                },
            })}
        >
            {children}
        </Box> -->

<style>
	.tooltip {
		position: relative;
		display: inline-block;
	}

	.tooltip:before {
		content: attr(data-text);
		position: absolute;
		top: -2rem;
		left: 50%;
		transform: translateX(-50%);
		font-size: 1.25rem;
		padding: 0.5em;
		border-radius: 0.5em;
		border: 1px solid var(--clr-accent);
		background: var(--clr-accent);
		color: var(--clr-accent-contrast);
		text-align: center;
		display: none;
		white-space: normal;
		z-index: 1;
		pointer-events: none;
		width: max-content;
	}

	.tooltip:hover:before {
		display: flex;
		justify-content: center;
	}
</style>
