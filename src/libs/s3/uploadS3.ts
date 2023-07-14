import s3Client from "./config";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";
import resize from "../sharp/resize";

export default async (file: File, resizeWidth?: number) => {
  try {
    let buffer = (await file.arrayBuffer()) as Buffer;

    if (resizeWidth) {
      buffer = await resize(buffer, 1280);
    }

    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: `${process.env.NODE_ENV}/${file.name}`,
      Body: buffer,
    };

    await s3Client.send(new PutObjectCommand(params));

    const location = `${process.env.AWS_S3_DOMAIN}/${params.Key}`;

    return location;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }
    return null;
  }
};
