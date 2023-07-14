import prisma from "@/libs/prismadb";

export default async (id: string) => {
  const post = await prisma.post.findUnique({ where: { id } });

  return post;
};
