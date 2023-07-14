"use client";

import useDeleteConfirm from "@/hooks/useDeleteConfirm";
import React from "react";
import { FaTimes } from "react-icons/fa";

interface PostDeleteProps {
  id: string;
}

const PostDelete = ({ id }: PostDeleteProps) => {
  const deleteConfirm = useDeleteConfirm();
  return (
    <FaTimes
      className="text-rose-500 cursor-pointer hover:opacity-70 hover:scale-110 transition"
      onClick={() => deleteConfirm.onOpen(id)}
    />
  );
};

export default PostDelete;
