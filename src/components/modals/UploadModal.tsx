"use client";

import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Modal from "./Modal";
import useUploadModal from "@/hooks/useUploadModal";
import Input from "../inputs/Input";
import Textarea from "../inputs/Textarea";
import File from "../inputs/File";
import { toast } from "react-hot-toast";
import axios from "axios";

const UploadModal = () => {
  const uploadModal = useUploadModal();
  const [files, setFiles] = useState<File[]>([]);
  const {
    control,
    formState: { errors },
    handleSubmit,
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

    // if (files.length > 0) {
    //   for (let i = 0; i < files.length; i++) {
    //     fd.append("images", files[i]);
    //   }
    // }

    try {
      const res = await axios.post("/api/post", fd);

      console.log(res);
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.log(error);
      }
      toast.error("error");
    }
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
          />
          <Textarea
            control={control}
            errors={errors}
            required
            label="본문"
            name="desc"
          />
        </div>
        <div className="flex-1 space-y-4">
          <Input
            control={control}
            errors={errors}
            required
            label="SEO제목"
            name="metaTitle"
          />
          <Input
            control={control}
            errors={errors}
            required
            label="SEO본문"
            name="metaDesc"
          />
          <Input
            control={control}
            errors={errors}
            required
            label="SEO키워드"
            name="metaKeywords"
          />
        </div>
      </div>
      <File files={files} setFiles={setFiles} multiple />
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
    />
  );
};

export default UploadModal;
