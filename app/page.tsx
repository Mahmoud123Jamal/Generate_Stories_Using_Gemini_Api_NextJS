import Header from "@/components/Header";
import Loading from "@/components/loading";
import dynamic from "next/dynamic";

export default function Home() {
  const LandingPage = dynamic(() => import("@/components/LandingPage"), {
    loading: () => <Loading />,
  });
  return (
    <div>
      <Header />
      <LandingPage />
    </div>
  );
}
