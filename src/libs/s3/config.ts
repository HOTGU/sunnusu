import { S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  credentials: {
    accessKeyId: String(process.env.AWS_S3_ACCESS),
    secretAccessKey: String(process.env.AWS_S3_SECRET),
  },
  region: process.env.AWS_S3_REGION,
});

export default s3Client;
