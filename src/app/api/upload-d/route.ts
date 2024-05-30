import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { randInt } from "~/server/lib/googleauth";
import path from "path";
import fs from 'fs';

const s = new S3Client({
    region: process.env.AWS_S3_LOCATION,
    credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_S3_SECRET_KEY!,
    }
});

async function uploadFileToS3(file: any, fileName: any, mimeType: string) {
    const fileBuffer = file;

    const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `${fileName}-${randInt(51)}`,
        Body: fileBuffer,
        ContentType: mimeType
    }

    const command = new PutObjectCommand(params);
    await s.send(command);

    const objectURL = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${fileName}`
    return objectURL;
}

export async function POST(request: any) {
    try {
        const filePath = path.join(process.cwd(), 'public', 'boat.jpg');
        const fileBuffer = fs.readFileSync(filePath);
        const mimeType = 'jpeg';
        const fileName = 'boat.jpeg';

        const objectURL = await uploadFileToS3(fileBuffer, fileName, mimeType);

        return NextResponse.json({ success: true, objectURL })
    } catch (error: any) {
        return NextResponse.json({ error: "Error uploading file!: " + error })
    }
}