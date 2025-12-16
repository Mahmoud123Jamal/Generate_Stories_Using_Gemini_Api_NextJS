import DashboardProvider from "@/components/providers/DashboardProvider";

type Props = {
  children: React.ReactNode;
};
function layout({ children }: Props) {
  return <DashboardProvider>{children}</DashboardProvider>;
}

export default layout;
