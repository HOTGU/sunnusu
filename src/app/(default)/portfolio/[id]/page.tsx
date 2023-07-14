import getPost from "@/actions/getPost";

interface IParams {
  id: string;
}

const PostDetailPage = async ({ params }: { params: IParams }) => {
  const post = await getPost(params.id);

  return <div>{post?.title}</div>;
};

export default PostDetailPage;
