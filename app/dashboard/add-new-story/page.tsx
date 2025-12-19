import dynamic from "next/dynamic";

const StoryForm = dynamic(() => import("@/components/ui/StoryForm"), {});
function page() {
  return <StoryForm />;
}

export default page;
