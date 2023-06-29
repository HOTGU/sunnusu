import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.formData();

    const dataObj: any = {};

    data.forEach((value, key) => {
      dataObj[`${key}`] = value;
      if (key === "images") {
      }
    });

    console.log(dataObj);

    return NextResponse.json(data);
  } catch (error) {
    return new NextResponse("서버 오류 발생", { status: 500 });
  }
}
