"use client";

import React, { useState } from "react";
import Confirm from "./Confirm";
import useDeleteConfirm from "@/hooks/useDeleteConfirm";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

const DeleteConfirm = () => {
  const deleteConfirm = useDeleteConfirm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const deletePost = () => {
    const loadingToast = toast.loading("삭제중..");
    setLoading(true);

    axios
      .delete(`/api/post/${deleteConfirm.target}`)
      .then(() => {
        toast.success("삭제성공", { id: loadingToast });
        router.refresh();
        deleteConfirm.onClose();
      })
      .catch((error) => {
        toast.error("삭제실패", { id: loadingToast });
      })
      .finally(() => setLoading(false));
  };

  return (
    <Confirm
      isOpen={deleteConfirm.isOpen}
      text="삭제하시겠습니까?"
      onClose={deleteConfirm.onClose}
      onAction={deletePost}
      disabled={loading}
    />
  );
};

export default DeleteConfirm;
