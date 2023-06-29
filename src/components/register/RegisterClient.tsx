"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import Input from "../inputs/Input";
import Button from "../Button";

export type RegisterType = {
  email: string;
  password: string;
  verifyPassword: string;
};

const defaultValues = {
  email: "",
  password: "",
  verifyPassword: "",
};

const RegisterClient = () => {
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FieldValues>({
    defaultValues,
  });

  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const loadingToast = toast.loading("회원가입중..");

    setLoading(true);
    axios
      .post("/api/register", data)
      .then((result) => {
        reset();
        router.push("/auth");
        toast.success("회원가입 성공", { id: loadingToast });
      })
      .catch((error) => {
        toast.error(error.response.data || "회원가입 실패", {
          id: loadingToast,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="mx-auto max-w-sm my-20">
      <form className="flex flex-col gap-6 justify-center items-center mb-2">
        <Input
          control={control}
          errors={errors}
          name="email"
          label="이메일"
          disabled={loading}
          required
        />
        <Input
          control={control}
          errors={errors}
          name="password"
          type="password"
          label="비밀번호"
          disabled={loading}
          required
        />
        <Input
          control={control}
          errors={errors}
          type="password"
          name="verifyPassword"
          label="비밀번호 확인"
          disabled={loading}
          required
        />
        <Button
          label="회원가입"
          disabled={loading}
          action={handleSubmit(onSubmit)}
        />
      </form>
    </div>
  );
};

export default RegisterClient;
