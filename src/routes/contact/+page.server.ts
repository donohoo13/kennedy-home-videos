import { fail } from "@sveltejs/kit";
import { SENDGRID_API_KEY } from "$env/static/private";
import sendgrid from "@sendgrid/mail";

export const actions = {
	submitForm: async ({ request }) => {
		const data = await request.formData();

		if (data.get("honeypot")) {
			// If the honeypot field is filled in, it's likely a spam bot
			return fail(422, { error: "Spam detected, please try again." });
		}

		const lastSubmission = {
			full_name: data.get("full_name"),
			email: data.get("email"),
			description: data.get("description"),
		};

		try {
			sendgrid.setApiKey(SENDGRID_API_KEY);
			// Send internal email
			await sendgrid.send({
				to: "sales@donohoo.dev",
				templateId: "d-1b74bcbd3c35401c8d6e53be639d6e47",
				from: "no-reply@donohoo.dev",
				dynamicTemplateData: lastSubmission,
			});
			// Send confirmation email
			await sendgrid.send({
				to: data.get("email") as string,
				templateId: "d-ad2eff7a1bdf4e928383ce5d34aed544",
				from: "no-reply@donohoo.dev",
				dynamicTemplateData: lastSubmission,
			});

			return { success: true, data: {}, message: "Form submitted successfully" };
		} catch (error: any) {
			console.log(`error :>>`, error?.response?.body);
			return fail(422, {
				success: false,
				lastSubmission,
				message: error?.message ?? error?.response?.body ?? "An error occurred",
			});
		}
	},
};
