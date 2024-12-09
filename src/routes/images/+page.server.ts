import { env } from "$env/dynamic/private";
import { AWS_BUCKET_REGION } from "$env/static/private";
import {
	S3Client,
	ListObjectsV2Command,
	type ListObjectsV2CommandOutput,
	GetObjectTaggingCommand,
	type GetObjectTaggingCommandOutput,
	GetObjectCommand,
} from "@aws-sdk/client-s3";
import { error } from "@sveltejs/kit";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const client = new S3Client({
	region: AWS_BUCKET_REGION,
	credentials: {
		accessKeyId: env.AWS_BUCKET_ACCESS_KEY,
		secretAccessKey: env.AWS_BUCKET_SECRET_KEY,
	},
});

export async function load({ cookies }: { cookies: any }): Promise<{
	images: string[];
	// images: {
	// 	Key: string;
	// 	LastModified: string;
	// 	Tags: { Key: string; Value: string }[];
	// 	signedUrl: string;
	// }[];
	// filteredImages: {
	// 	Key: string;
	// 	LastModified: string;
	// 	Tags: { Key: string; Value: string }[];
	// 	signedUrl: string;
	// }[];
}> {
	const authenticated = cookies.get("authenticated");

	if (!authenticated) {
		error(401, { message: "Unauthorized" });
	}

	const command = new ListObjectsV2Command({
		Bucket: "kennedy-home-videos",
		Prefix: "images/",
	});

	const response = await client.send(command);

	// const images: any[] = [];
	const imagePromises: Promise<any>[] = [];
	response.Contents?.map((content) => {
		if (content.Size === 0) return;

		imagePromises.push(
			getSignedUrl(
				client,
				new GetObjectCommand({
					Bucket: "kennedy-home-videos",
					Key: content.Key,
					ResponseContentType: "image/webp",
				}),
				{
					expiresIn: 3600, // 1 hour
				}
			)
		);
	});

	const images = await Promise.all(imagePromises);

	console.log(`images :>>`, images);

	// return { images, filteredImages: [...images] };
	return { images };
}
