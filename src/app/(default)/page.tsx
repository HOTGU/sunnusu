import getPortfolio from "@/actions/getPortfolio";
import { getServerSession } from "next-auth";
import Image from "next/legacy/image";
import React from "react";

const HomePage = async () => {
  // const portfolios = await getPortfolio();

  return <div className="relative max-w-5xl aspect-video"></div>;
};

export default HomePage;
