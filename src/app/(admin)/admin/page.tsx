import getPosts from "@/actions/getPosts";
import PostBlock from "@/components/admin/PostBlock";
import PostUpload from "@/components/admin/PostUpload";
import React from "react";

const AdminHome = async () => {
  const posts = await getPosts();
  return (
    <div>
      <PostUpload />
      {posts?.map((post) => (
        <PostBlock key={post.id} post={post} />
      ))}
    </div>
  );
};

export default AdminHome;
