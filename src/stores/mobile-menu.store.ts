import { writable } from "svelte/store";
import { goto } from "$app/navigation";

export const isMobileMenuOpen = writable<boolean>(false);

export function toggleMobileMenu(goToRoute?: string, open?: boolean): void {
	isMobileMenuOpen.update((value) => {
		const updatedValue = open === undefined ? !value : open;
		if (updatedValue) {
			// If we are opening the menu
			document.body.style.overflowY = "hidden";
		} else {
			// If we are closing the menu
			document.body.style.overflowY = "auto";
		}

		return updatedValue;
	});

	if (goToRoute) {
		goto(goToRoute);
	}
}
