import React from "react";

type Props = {
  children: React.ReactNode;
};
function DashboardProvider({ children }: Props) {
  return <div>{children}</div>;
}

export default DashboardProvider;
