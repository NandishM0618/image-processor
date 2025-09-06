// index.js
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";

const s3 = new S3Client({ region: process.env.AWS_REGION });
const BUCKET_NAME = process.env.BUCKET_NAME || "cloud-image-processor-uploads";

export const handler = async (event) => {
    console.log("EVENT:", JSON.stringify(event, null, 2));

    if (event.httpMethod === "OPTIONS") {
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "https://image-processor-nfi4.vercel.app",
                "Access-Control-Allow-Headers": "Content-Type,Authorization",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                "Access-Control-Allow-Credentials": "true",
            },
            body: "",
        };
    }

    try {
        const { fileName, fileType, userId } = JSON.parse(event.body || "{}");

        if (!fileName || !fileType || !userId) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Missing fileName, fileType, or userId" }),
            };
        }

        const key = `original/${userId}/${uuidv4()}-${fileName}`;

        const command = new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: key,
            ContentType: fileType,
            Metadata: userId
        });

        const url = await getSignedUrl(s3, command, { expiresIn: 60 });

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "https://image-processor-nfi4.vercel.app",
                "Access-Control-Allow-Credentials": "true",
            },
            body: JSON.stringify({
                uploadUrl: url,
                key,
            }),
        };
    } catch (err) {
        console.error("Error generating presigned URL:", err);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to generate presigned URL" }),
        };
    }
};
