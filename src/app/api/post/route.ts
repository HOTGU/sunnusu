import { NextResponse } from "next/server";

import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import uploadS3 from "@/libs/s3/uploadS3";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) return new NextResponse("인증안됨", { status: 403 });
    if (!currentUser.is_admin)
      return new NextResponse("인증안됨", { status: 403 });

    const data = await request.formData();

    const dataObj: any = {};

    const images: File[] = [];
    const imageLocations: string[] = [];

    data.forEach((value, key) => {
      if (key === "images") {
        images.push(value as File);
      } else {
        dataObj[key] = value;
      }
    });

    for (let i = 0; i < images.length; i++) {
      const s3Location = await uploadS3(images[i], 1280);
      imageLocations.push(s3Location!);
    }

    dataObj.images = imageLocations;

    const { metaTitle, metaDesc, metaKeywords, ...postData } = dataObj;

    const metaData = {
      title: metaTitle,
      desc: metaDesc,
      keywords: metaKeywords,
    };

    const post = await prisma.post.create({
      data: { ...postData, metadata: { create: { ...metaData } } },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return new NextResponse("서버 오류 발생", { status: 500 });
  }
}
