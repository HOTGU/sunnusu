import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/libs/prismadb";
import { getServerSession } from "next-auth";

export default async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.id) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: { id: session.id },
    });

    if (!currentUser) return null;

    const { password, ...noPwUser } = currentUser;

    return noPwUser;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }
    return null;
  }
};
