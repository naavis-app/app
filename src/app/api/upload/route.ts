/* uploads a file that is uploaded to a form to amazon s3, where it is stored,
and the link to the image is stored on the database for use in our application.
*/

import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { randInt } from "~/server/lib/googleauth";
import { db } from "~/server/db";

const s = new S3Client({
    region: process.env.AWS_S3_LOCATION,
    credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_S3_SECRET_KEY!,
    },
});

async function uploadFileToS3(file: any, fileName: any, mimeType: string) {
    const fileBuffer = file;
    fileName = fileName + randInt(51).toString();

    const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `${fileName}`,
        Body: fileBuffer,
        ContentType: mimeType,
    };

    const command = new PutObjectCommand(params);
    await s.send(command);

    const objectURL = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${fileName}`;
    return objectURL;
}

export async function POST(request: any) {
    try {
        const formData = await request.formData();
        const file = formData.get("file");
        const userId = formData.get("userId") as string;

        if (!file) {
            return NextResponse.json(
                { error: "file is required" },
                { status: 400 },
            );
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const mimeType = file.type;
        const objectURL = await uploadFileToS3(buffer, file.name, mimeType);

        await db.user.update({
            where: {
                id: userId,
            },
            data: {
                profile_pic: objectURL,
            },
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: "Error uploading file!: " + error });
    }
}
