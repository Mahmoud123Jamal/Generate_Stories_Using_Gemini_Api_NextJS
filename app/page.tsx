import Header from "@/components/layouts/Header";
import Loading from "@/app/loading";
import dynamic from "next/dynamic";
import Footer from "@/components/layouts/Footer";

export default function Home() {
  const LandingPage = dynamic(() => import("@/components/ui/LandingPage"), {
    loading: () => <Loading />,
  });
  return (
    <div>
      <Header />
      <LandingPage />
      <Footer />
    </div>
  );
}
