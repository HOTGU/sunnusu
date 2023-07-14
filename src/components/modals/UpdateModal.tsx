"use client";

import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useUpdateModal from "@/hooks/useUpdateModal";

import Modal from "./Modal";
import Textarea from "../inputs/Textarea";
import Input from "../inputs/Input";
import File from "../inputs/File";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

const UpdateModal = () => {
  const router = useRouter();
  const updateModal = useUpdateModal();
  const [loading, setLoading] = useState(false);
  const [currentFiles, setCurrentFiles] = useState(updateModal.target?.images);
  const [newFiles, setNewFiles] = useState<File[]>([]);

  const {
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<FieldValues>({
    defaultValues: {
      title: updateModal.target?.title,
      desc: updateModal.target?.desc,
      metaTitle: updateModal.target?.metadata.title,
      metaDesc: updateModal.target?.metadata.desc,
      metaKeywords: updateModal.target?.metadata.keywords,
    },
  });

  useEffect(() => {
    reset({
      title: updateModal.target?.title,
      desc: updateModal.target?.desc,
      metaTitle: updateModal.target?.metadata.title,
      metaDesc: updateModal.target?.metadata.desc,
      metaKeywords: updateModal.target?.metadata.keywords,
    });
    setCurrentFiles(updateModal.target?.images);
    setNewFiles([]);
  }, [updateModal.target]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const fd = new FormData();

    for (const key in data) {
      fd.append(key, data[key]);
    }
    if (currentFiles && currentFiles.length > 0) {
      for (let i = 0; i < currentFiles?.length; i++) {
        fd.append("currentFiles", currentFiles[i]);
      }
    }
    for (let i = 0; i < newFiles?.length; i++) {
      fd.append("files", newFiles[i], newFiles[i].name);
    }

    const loadingToast = toast.loading("업데이트중..");
    setLoading(true);

    axios
      .put(`/api/post/${updateModal.target?.id}`, fd)
      .then(() => {
        updateModal.onClose();
        router.refresh();
        toast.success("업데이트 성공", { id: loadingToast });
      })
      .catch(() => {
        toast.error("업데이트 실패", { id: loadingToast });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDelete = (index: number) => {
    const deletedFiles = currentFiles?.filter((__, i) => i !== index);
    setCurrentFiles(deletedFiles);
  };

  const bodyContent = (
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
      <File
        files={newFiles}
        setFiles={setNewFiles}
        multiple
        disabled={loading}
      />
      <div className="flex flex-wrap gap-2 ">
        {currentFiles &&
          currentFiles.length > 0 &&
          currentFiles.map((file, index) => (
            <div
              key={file}
              className="flex items-center gap-4 bg-zinc-100 px-2 py-1 rounded"
            >
              <span>{file.split("/").at(-1)}</span>
              <FaTimes
                onClick={() => handleDelete(index)}
                size={14}
                className="text-rose-500 cursor-pointer hover:opacity-70 transition"
              />
            </div>
          ))}
      </div>
    </div>
  );

  if (!updateModal.target) return null;

  return (
    <Modal
      head="업데이트"
      body={bodyContent}
      isOpen={updateModal.isOpen}
      onClose={updateModal.onClose}
      actionLabel="수정"
      onSubmit={handleSubmit(onSubmit)}
      disabled={loading}
    />
  );
};

export default UpdateModal;
