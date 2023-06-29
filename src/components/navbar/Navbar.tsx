import React from "react";

import Container from "../Container";
import Logo from "./Logo";
import NavItem from "./NavItem";
import { User } from "@prisma/client";
import { CurrentUserType } from "@/types";

interface NavbarProps {
  currentUser: CurrentUserType;
}

const Navbar = ({ currentUser }: NavbarProps) => {
  return (
    <nav className="border-b border-zinc-200 shadow-sm fixed top-0 w-full h-16 bg-white">
      <Container>
        <div className="flex justify-between items-center h-full">
          <Logo />
          <NavItem currentUser={currentUser} />
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
