import React from "react";
import AppSideBar from "../ui/AppSideBar";

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
