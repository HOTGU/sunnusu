"use client";

import useUpdateModal from "@/hooks/useUpdateModal";
import { PostWithMetadata } from "@/types";
import React from "react";
import { BsFillPencilFill } from "react-icons/bs";

interface PostUpdateProps {
  post: PostWithMetadata;
}

const PostUpdate = ({ post }: PostUpdateProps) => {
  const updateModal = useUpdateModal();

  return (
    <BsFillPencilFill
      className="text-sky-500 cursor-pointer hover:scale-105 hover:opacity-70 transition"
      onClick={() => updateModal.onOpen(post)}
    />
  );
};

export default PostUpdate;
