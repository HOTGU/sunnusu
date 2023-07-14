import Image from "next/legacy/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/" className="flex gap-1 items-center">
      <Image src="/logo.svg" width={60} height={60} />
      <h1 className="font-bold text-2xl">태양누수</h1>
    </Link>
  );
};

export default Logo;
