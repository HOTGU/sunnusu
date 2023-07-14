import sharp from "sharp";

export default async (buffer: Buffer, width: number) => {
  const resizedBuffer = await sharp(buffer)
    .resize({ width })
    .toFormat("webp")
    .toBuffer();

  return resizedBuffer;
};
