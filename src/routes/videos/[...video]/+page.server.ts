import {
	AWS_BUCKET_ACCESS_KEY,
	AWS_BUCKET_SECRET_KEY,
	AWS_BUCKET_REGION,
} from "$env/static/private";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { error } from "@sveltejs/kit";

const client = new S3Client({
	region: AWS_BUCKET_REGION,
	credentials: {
		accessKeyId: AWS_BUCKET_ACCESS_KEY,
		secretAccessKey: AWS_BUCKET_SECRET_KEY,
	},
});

export async function load({
	params,
}: {
	params: { video: string };
}): Promise<{ signedUrl: string; video: string }> {
	if (!params.video) {
		error(404);
	}

	const command = new GetObjectCommand({
		Bucket: "kennedy-home-videos",
		Key: params.video,
	});

	const signedUrl = await getSignedUrl(client, command, {
		expiresIn: 3600, // 1 hour
	});

	return { signedUrl, video: params.video };
}
