import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";

const REGION = process.env.REGION;
const BUCKET_NAME = process.env.BUCKET_NAME;
const DYNAMO_TABLE = process.env.DYNAMO_TABLE;

const s3 = new S3Client({ region: REGION });
const dynamo = new DynamoDBClient({ region: REGION });

const streamToBuffer = (stream) =>
    new Promise((resolve, reject) => {
        const chunks = [];
        stream.on("data", (c) => chunks.push(c));
        stream.on("end", () => resolve(Buffer.concat(chunks)));
        stream.on("error", reject);
    });

function contentTypeFromKey(key) {
    const ext = key.toLowerCase().split(".").pop();
    switch (ext) {
        case "jpg":
        case "jpeg":
            return "image/jpeg";
        case "png":
            return "image/png";
        case "webp":
            return "image/webp";
        default:
            return "application/octet-stream";
    }
}

export const handler = async (event) => {

    if (!event.Records) {
        return { statusCode: 400, body: "No records in event" };
    }

    for (const record of event.Records) {
        const bucket = record.s3.bucket.name;
        const key = decodeURIComponent(record.s3.object.key.replace(/\+/g, " "));

        if (!key.startsWith("original/")) {
            console.log(`Skipping non-original key: ${key}`);
            continue;
        }

        const userId = key.split('/')[1];

        const get = await s3.send(new GetObjectCommand({ Bucket: bucket, Key: key }));
        const imageBuffer = await streamToBuffer(get.Body);

        const sizes = [
            { name: "thumb", width: 200 },
            { name: "medium", width: 800 },
            { name: "large", width: 1200 },
        ];

        const baseOutKey = key.replace(/^original\//, "");

        const tasks = sizes.map(async (size) => {
            const resized = await sharp(imageBuffer)
                .resize({ width: size.width })
                .toBuffer();

            const outKey = `${size.name}/${baseOutKey}`;
            const ct = contentTypeFromKey(outKey);

            await s3.send(
                new PutObjectCommand({
                    Bucket: BUCKET_NAME || bucket,
                    Key: outKey,
                    Body: resized,
                    ContentType: ct,
                })
            );

            console.log(`Wrote ${outKey}`);
            return { [size.name]: `s3://${BUCKET_NAME}/${outKey}` }
        });

        const results = await Promise.all(tasks);
        const uploadPaths = Object.assign({}, ...results);

        await dynamo.send(new PutItemCommand({
            TableName: DYNAMO_TABLE,
            Item: {
                userId: { S: userId },
                imageId: { S: uuidv4() },
                original: { S: `s3://${BUCKET_NAME}/${key}` },
                thumb: { S: uploadPaths.thumb },
                medium: { S: uploadPaths.medium },
                large: { S: uploadPaths.large },
                uploadedAt: { S: new Date().toISOString() }
            }
        }));
        console.log(`Metadata written to DynamoDB for ${key}`);
    }

    return { statusCode: 200, body: "OK" };
};
