import { env } from "$env/dynamic/private";
import { fail, redirect } from "@sveltejs/kit";

const PASSWORD = env.AUTH_PASSWORD;

export const actions = {
	load: async ({ cookies }) => {
		const authenticated = cookies.get("authenticated");

		if (authenticated) {
			return redirect(302, "/");
		}
	},
	authenticate: async ({ request, cookies }) => {
		const data = await request.formData();

		if (data.get("password") !== PASSWORD) {
			return fail(401, { message: "Invalid password" });
		} else {
			cookies.set("authenticated", "true", {
				path: "/",
				secure: true,
				httpOnly: true,
				sameSite: "strict",
				expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14), // 14 days
			});
		}

		const redirectValue = data.get("redirect");
		if (redirectValue) {
			return redirect(302, redirectValue);
		} else {
			return redirect(302, "/");
		}
	},
};
