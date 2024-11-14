import { env } from "$env/dynamic/private";
import { fail, redirect } from "@sveltejs/kit";

const PASSWORD = env.AUTH_PASSWORD;

export const actions = {
	default: async ({ request, params, cookies }) => {
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

		if (params.redirect) {
			return redirect(302, params.redirect);
		} else {
			return redirect(302, "/");
		}
	},
};
