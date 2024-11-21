import { env } from "$env/dynamic/private";
import { AWS_BUCKET_REGION } from "$env/static/private";
import {
	S3Client,
	ListObjectsV2Command,
	type ListObjectsV2CommandOutput,
	GetObjectTaggingCommand,
	type GetObjectTaggingCommandOutput,
} from "@aws-sdk/client-s3";

const client = new S3Client({
	region: AWS_BUCKET_REGION,
	credentials: {
		accessKeyId: env.AWS_BUCKET_ACCESS_KEY,
		secretAccessKey: env.AWS_BUCKET_SECRET_KEY,
	},
});

export async function load(): Promise<{
	videos: { Key: string; LastModified: string; Tags: { Key: string; Value: string }[] }[];
}> {
	const command = new ListObjectsV2Command({
		Bucket: "kennedy-home-videos",
		Prefix: "videos/",
	});

	const response = await client.send(command);

	const videos: any[] = [];
	const videoTagsPromises: Promise<any>[] = [];
	response.Contents?.forEach((content) => {
		videoTagsPromises.push(
			client
				.send(
					new GetObjectTaggingCommand({
						Bucket: "kennedy-home-videos",
						Key: content.Key,
					})
				)
				.then((res) => {
					videos.push({
						...content,
						Tags: res.TagSet ?? [],
					});
				})
		);
	});

	await Promise.all(videoTagsPromises);

	return { videos };
}
