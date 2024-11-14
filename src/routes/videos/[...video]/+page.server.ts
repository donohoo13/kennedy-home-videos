import { env } from "$env/dynamic/private";
import { AWS_BUCKET_REGION } from "$env/static/private";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { error } from "@sveltejs/kit";

const client = new S3Client({
	region: AWS_BUCKET_REGION,
	credentials: {
		accessKeyId: env.AWS_BUCKET_ACCESS_KEY,
		secretAccessKey: env.AWS_BUCKET_SECRET_KEY,
	},
});

export async function load({
	params,
	cookies,
}: {
	params: any;
	cookies: any;
}): Promise<{ signedUrl: string; video: string }> {
	if (!params.video) {
		error(402, { message: "No video provided" });
	}

	const authenticated = cookies.get("authenticated");

	if (!authenticated) {
		error(401, { message: "Unauthorized" });
	}

	const command = new GetObjectCommand({
		Bucket: "kennedy-home-videos",
		Key: params.video,
	});

	try {
		const signedUrl = await getSignedUrl(client, command, {
			expiresIn: 3600, // 1 hour
		});

		return { signedUrl, video: params.video };
	} catch (err) {
		console.error(`error :>>`, err);
		error(404, { message: "Not Found" });
	}
}
