import { RegisterType } from "@/components/register/RegisterClient";
import prisma from "@/libs/prismadb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body: RegisterType = await request.json();

    if (!body.email || !body.password || !body.verifyPassword) {
      return new NextResponse("입력창을 다 입력하세요", { status: 500 });
    }

    if (body.password !== body.verifyPassword) {
      return new NextResponse("비밀번호 확인이 다릅니다", { status: 500 });
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const data = {
      email: body.email,
      password: hashedPassword,
    };

    const user = await prisma.user.create({ data });

    return NextResponse.json(user);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }
    return new NextResponse("서버 에러발생", { status: 500 });
  }
}
