"use client";

import React from "react";

import useUploadModal from "@/hooks/useUploadModal";
import Button from "../Button";

const PostUpload = () => {
  const uploadModal = useUploadModal();

  return (
    <>
      <div className="w-fit">
        <Button
          label="게시글 업로드"
          action={uploadModal.onOpen}
          small
          outline
        />
      </div>
    </>
  );
};

export default PostUpload;
