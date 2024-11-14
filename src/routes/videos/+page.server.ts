import { AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_BUCKET_REGION } from "$env/static/private";
import {
	S3Client,
	ListObjectsV2Command,
	type ListObjectsV2CommandOutput,
} from "@aws-sdk/client-s3";

const client = new S3Client({
	region: AWS_BUCKET_REGION,
	credentials: {
		accessKeyId: AWS_ACCESS_KEY,
		secretAccessKey: AWS_SECRET_KEY,
	},
});

export async function load(): Promise<{ videos: ListObjectsV2CommandOutput["Contents"] }> {
	const command = new ListObjectsV2Command({
		Bucket: "kennedy-home-videos",
	});

	const response = await client.send(command);

	return { videos: response.Contents ?? [] };
}
