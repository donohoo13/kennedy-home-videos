import { writable } from "svelte/store";

export const theme = writable<"light" | "dark" | "unknown">(getInitialColorScheme());

export function toggleTheme() {
	theme.update((value) => {
		const newTheme = value === "light" ? "dark" : "light";
		document.body.dataset.theme = newTheme;
		localStorage.setItem("theme", newTheme);
		return newTheme;
	});
}

function getInitialColorScheme(): "light" | "dark" | "unknown" {
	if (typeof window === "undefined") {
		// Server side rendering
		return "unknown";
	}

	// Default to light theme
	return (document.body.dataset.theme as "light" | "dark") || "unknown";
}
