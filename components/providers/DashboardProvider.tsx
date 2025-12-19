"use client";
import React from "react";
import dynamic from "next/dynamic";

const AppSideBar = dynamic(() => import("@/components/ui/AppSideBar"), {
  ssr: false,
});

type Props = {
  children: React.ReactNode;
};
function DashboardProvider({ children }: Props) {
  return (
    <div>
      <AppSideBar>{children}</AppSideBar>
    </div>
  );
}

export default DashboardProvider;
