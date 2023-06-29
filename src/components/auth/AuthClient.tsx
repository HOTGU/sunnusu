"use client";

import React, { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Input from "../inputs/Input";
import Button from "../Button";

const AuthClient = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({ defaultValues: { email: "", password: "" } });

  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<FieldValues> = useCallback((data) => {
    setLoading(true);
    const loadingToast = toast.loading("로그인중..");
    signIn("credentials", { redirect: false, ...data })
      .then((callback: any) => {
        if (callback.error) {
          toast.error("이메일 또는 비밀번호를 확인하세요", {
            id: loadingToast,
          });
        } else {
          toast.success("로그인 성공", { id: loadingToast });
          reset();
          router.refresh();
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <form className="flex flex-col gap-6 justify-center items-center mx-auto max-w-sm my-20">
      <Input
        control={control}
        errors={errors}
        name="email"
        label="이메일"
        disabled={loading}
        type="email"
        required
      />
      <Input
        control={control}
        errors={errors}
        name="password"
        label="비밀번호"
        disabled={loading}
        type="password"
        required
      />
      <Button
        disabled={loading}
        label="로그인"
        action={handleSubmit(onSubmit)}
      />
    </form>
  );
};

export default AuthClient;
