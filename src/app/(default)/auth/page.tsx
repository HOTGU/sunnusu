import React from "react";

import AuthClient from "@/components/auth/AuthClient";
import getCurrentUser from "@/actions/getCurrentUser";
import { redirect } from "next/navigation";

const AuthPage = async () => {
  const currentUser = await getCurrentUser();

  if (currentUser) redirect("/");

  return <AuthClient />;
};

export default AuthPage;
