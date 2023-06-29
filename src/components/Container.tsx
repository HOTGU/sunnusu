import React from "react";

interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return (
    <div className="px-2 sm:px-4 md:px-6 lg:px-8 xl:px-14 2xl:px-20 h-full w-full">
      {children}
    </div>
  );
};

export default Container;
