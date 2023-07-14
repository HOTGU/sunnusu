import getPosts from "@/actions/getPosts";
import PostBlock from "@/components/admin/PostBlock";
import PostUpload from "@/components/admin/PostUpload";
import React from "react";

const AdminHome = async () => {
  const posts = await getPosts();

  return (
    <div className="lg:w-fit mx-auto border rounded-md p-4">
      <PostUpload />
      <div className="mt-2 w-fit min-w-[350px] space-y-2 h-[calc(100vh-200px)] overflow-y-auto">
        {posts?.map((post) => (
          <PostBlock key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default AdminHome;
