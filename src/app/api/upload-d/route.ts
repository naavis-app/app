/* same as the other upload endpoint but only uploads a default image
in the event that the user does not want to add a profile picture
*/

import fs from "node:fs";
import path from "node:path";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { randInt } from "~/server/lib/googleauth";

if (!process.env.AWS_S3_BUCKET_NAME) {
	throw new Error("AWS_S3_BUCKET_NAME is not defined");
}

if (!process.env.AWS_S3_ACCESS_KEY) {
	throw new Error("AWS_S3_ACCESS_KEY is not defined");
}

if (!process.env.AWS_S3_SECRET_KEY) {
	throw new Error("AWS_S3_SECRET_KEY is not defined");
}

const s = new S3Client({
	region: process.env.AWS_S3_LOCATION,
	credentials: {
		accessKeyId: process.env.AWS_S3_ACCESS_KEY,
		secretAccessKey: process.env.AWS_S3_SECRET_KEY,
	},
});

async function uploadFileToS3(
	file: Buffer,
	fileName: string,
	mimeType: string,
) {
	const fileBuffer = file;
	const fileSlug = fileName + randInt(51).toString();

	const params = {
		Bucket: process.env.AWS_S3_BUCKET_NAME,
		Key: `${fileSlug}`,
		Body: fileBuffer,
		ContentType: mimeType,
	};

	const command = new PutObjectCommand(params);
	await s.send(command);

	const objectURL = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${fileSlug}`;
	return objectURL;
}

export async function POST(request: any) {
	try {
		const formData = await request.formData();
		const userId = formData.get("userId") as string;
		const filePath = path.join(process.cwd(), "public", "boat.jpg");
		const fileBuffer = fs.readFileSync(filePath);
		const mimeType = "jpeg";
		const fileName = "boat.jpeg";

		const objectURL = await uploadFileToS3(fileBuffer, fileName, mimeType);

		await db.user.update({
			where: {
				id: userId,
			},
			data: {
				profile_pic: objectURL,
			},
		});

		return NextResponse.json({ success: true, objectURL });
	} catch (error: any) {
		return NextResponse.json({ error: `Error uploading file!: ${error}` });
	}
}
