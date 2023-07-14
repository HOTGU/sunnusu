"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import useUploadModal from "@/hooks/useUploadModal";
import Modal from "./Modal";
import Input from "../inputs/Input";
import Textarea from "../inputs/Textarea";
import File from "../inputs/File";

const UploadModal = () => {
  const uploadModal = useUploadModal();
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      desc: "",
      metaTitle: "",
      metaDesc: "",
      metaKeywords: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const fd = new FormData();

    fd.append("title", data.title);
    fd.append("desc", data.desc);
    fd.append("metaTitle", data.metaTitle);
    fd.append("metaDesc", data.metaDesc);
    fd.append("metaKeywords", data.metaKeywords);

    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        fd.append("images", files[i], files[i].name);
      }
    }

    const loadingToast = toast.loading("생성중..");
    setLoading(true);

    axios
      .post("/api/post", fd)
      .then(() => {
        toast.success("생성성공", { id: loadingToast });
        reset();
        setFiles([]);
        uploadModal.onClose();
        router.refresh();
      })
      .catch((error) => {
        if (process.env.NODE_ENV === "development") {
          console.log(error);
        }
        toast.error("생성실패", { id: loadingToast });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const body = (
    <div className=" space-y-4">
      <div className="flex gap-4">
        <div className="flex-1 space-y-4">
          <Input
            control={control}
            errors={errors}
            required
            label="제목"
            name="title"
            disabled={loading}
          />
          <Textarea
            control={control}
            errors={errors}
            required
            label="본문"
            name="desc"
            disabled={loading}
          />
        </div>
        <div className="flex-1 space-y-4">
          <Input
            control={control}
            errors={errors}
            required
            label="SEO제목"
            disabled={loading}
            name="metaTitle"
          />
          <Input
            control={control}
            errors={errors}
            required
            label="SEO본문"
            disabled={loading}
            name="metaDesc"
          />
          <Input
            control={control}
            errors={errors}
            required
            label="SEO키워드"
            name="metaKeywords"
            disabled={loading}
          />
        </div>
      </div>
      <File files={files} setFiles={setFiles} multiple disabled={loading} />
    </div>
  );

  return (
    <Modal
      isOpen={uploadModal.isOpen}
      head="업로드"
      body={body}
      actionLabel="제출"
      onSubmit={handleSubmit(onSubmit)}
      onClose={uploadModal.onClose}
      disabled={loading}
    />
  );
};

export default UploadModal;
