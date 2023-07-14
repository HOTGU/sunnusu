import { NextResponse } from "next/server";

import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import uploadS3 from "@/libs/s3/uploadS3";

interface IParams {
  id: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser || !currentUser?.is_admin)
      new NextResponse("인증 안 된 유저", { status: 403 });

    const { id } = params;

    if (!id || typeof id !== "string")
      new NextResponse("인증 안 된 주소", { status: 500 });

    await prisma.post.delete({ where: { id } });

    return new NextResponse("삭제 성공", { status: 200 });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }
    return new NextResponse("서버 오류 발생", { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser || !currentUser?.is_admin)
      new NextResponse("인증 안 된 유저", { status: 403 });

    const { id } = params;

    if (!id || typeof id !== "string")
      new NextResponse("인증 안 된 주소", { status: 500 });

    const data = await request.formData();
    const dataObj: any = {};

    const newFiles: File[] = [];

    const fileLocations: String[] = [];

    data.forEach((value, key) => {
      if (key === "files") {
        newFiles.push(value as File);
      } else if (key === "currentFiles") {
        fileLocations.push(value as String);
      } else {
        dataObj[key] = value;
      }
    });

    if (newFiles.length > 0) {
      for (let i = 0; i < newFiles.length; i++) {
        const location = await uploadS3(newFiles[i], 760);
        fileLocations.push(location!);
      }
    }

    dataObj.images = fileLocations;

    const { metaTitle, metaDesc, metaKeywords, ...postData } = dataObj;

    const metaData = {
      title: metaTitle,
      desc: metaDesc,
      keywords: metaKeywords,
    };

    await prisma.post.update({
      where: { id },
      data: {
        ...postData,
        metadata: {
          update: {
            ...metaData,
          },
        },
      },
    });

    return new NextResponse("업데이트 성공", { status: 200 });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }
    return new NextResponse("서버 오류 발생", { status: 500 });
  }
}
