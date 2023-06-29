"use client";

import { Post } from "@prisma/client";
import React from "react";

interface PostBlockProps {
  post: Post;
}

const PostBlock = ({ post }: PostBlockProps) => {
  return <div>{post.title}</div>;
};

export default PostBlock;
