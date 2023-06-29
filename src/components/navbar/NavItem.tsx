import React from "react";
import Link from "next/link";
import { CurrentUserType } from "@/types";
import { AiFillPhone } from "react-icons/ai";
import { RiAdminLine } from "react-icons/ri";

interface NavItemProps {
  currentUser: CurrentUserType;
}

const NavItem = ({ currentUser }: NavItemProps) => {
  return (
    <div className="flex items-center gap-4">
      <Link
        href="/portfolio"
        className="px-2 py-1 rounded bg-sky-500 text-white hover:opacity-70 transition cursor-pointer"
      >
        시공사례
      </Link>
      <div className="flex items-center gap-1">
        <AiFillPhone size={30} />
        <div className=" font-bold text-2xl">010-9799-2476</div>
      </div>
      {currentUser && currentUser.is_admin && (
        <Link href="/admin">
          <div className="bg-zinc-200 p-1 rounded-full hover:opacity-70 transition">
            <RiAdminLine size={20} />
          </div>
        </Link>
      )}
    </div>
  );
};

export default NavItem;
