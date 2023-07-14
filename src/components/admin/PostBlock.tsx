import React from "react";
import { Post } from "@prisma/client";

import PostDelete from "./PostDelete";
import PostUpdate from "./PostUpdate";
import { PostWithMetadata } from "@/types";

interface PostBlockProps {
  post: PostWithMetadata;
}

const PostBlock = ({ post }: PostBlockProps) => {
  return (
    <div className="flex gap-2 items-center justify-between bg-zinc-100 rounded p-2">
      <span className="max-w-[330px] truncate">{post.title}</span>
      <div className="flex gap-2">
        <PostUpdate post={post} />
        <PostDelete id={post.id} />
      </div>
    </div>
  );
};

export default PostBlock;
