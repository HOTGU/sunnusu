import client from "@/libs/prismadb";

export default async () => {
  try {
    const posts = await client.post.findMany();

    return posts;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }
    return null;
  }
};
