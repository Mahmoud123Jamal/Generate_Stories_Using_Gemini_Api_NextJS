"use client";
import { previewStory } from "@/types/StoryType";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FiArrowLeft, FiBookOpen, FiLayers } from "react-icons/fi";
import Loader from "@/components/ui/loader";

function StoryDetails() {
  const { storyId } = useParams();
  const router = useRouter();
  const [story, setStory] = useState<previewStory | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchParticularStory = async () => {
      if (!storyId) return;
      setLoading(true);
      try {
        const res = await fetch(`/api/view-story?storyId=${storyId}`);
        const response = await res.json();
        if (res.ok) {
          setStory(response);
        }
      } catch (error) {
        console.error("Error fetching story:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchParticularStory();
  }, [storyId]);

  if (loading) return <Loader />;
  if (!story) return <div className="text-center mt-20">Story not found!</div>;

  const storyData = story.content.story;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Navigation */}
      <div className="bg-white shadow-sm p-4 sticky top-0 z-50 flex items-center justify-between px-4 md:px-20 gap-2">
        <button
          onClick={() => router.back()}
          className="btn btn-ghost btn-sm md:btn-md gap-1 md:gap-2 px-2"
        >
          <FiArrowLeft className="text-lg" />
          <span className="hidden xs:inline">Back</span>
        </button>

        <h1 className="text-sm sm:text-lg md:text-xl font-bold text-orange-600 truncate flex-1 text-center px-2 max-w-37.5 xs:max-w-[200px] sm:max-w-md">
          {storyData.title}
        </h1>

        <div className="badge badge-warning badge-sm md:badge-md gap-1 font-bold whitespace-nowrap">
          <FiLayers className="hidden xs:block" />
          {storyData.totalPages}{" "}
          <span className="hidden sm:inline ml-1">Pages</span>
          <span className="sm:hidden ml-1">P.</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-8 px-4">
        {/* Story Cover Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-3xl shadow-xl mb-12 border border-orange-100">
          <div className="relative h-100 rounded-2xl overflow-hidden shadow-inner">
            <Image
              src={story.imageUrl || "/images/placeholder.jpg"}
              alt="Story Cover"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex gap-2 mb-4">
              <span className="badge badge-outline badge-secondary">
                {storyData.type}
              </span>
              <span className="badge badge-outline badge-accent">
                Age: {storyData.ageGroup}
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-gray-800 mb-4 leading-tight">
              {storyData.title}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed italic">
              "{storyData.description}"
            </p>
          </div>
        </div>

        {/* Story Pages List */}
        <div className="space-y-12">
          <h3 className="text-2xl font-bold text-gray-700 flex items-center gap-2 px-2">
            <FiBookOpen className="text-orange-500" /> Start Reading
          </h3>

          {storyData?.pages?.map((page: any, index: number) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row gap-8 items-center bg-white p-6 rounded-3xl shadow-md border border-gray-100 ${
                index % 2 !== 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Page Content */}
              <div className="flex-1 space-y-4">
                <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
                  {page.pageNumber}
                </div>
                <h4 className="text-2xl font-bold text-gray-800">
                  {page.title}
                </h4>
                <p className="text-xl text-gray-600 leading-loose">
                  {page.content}
                </p>
              </div>

              {/* Page Image Placeholder (Since each page might have its own AI image) */}
              <div className="flex-1 w-full h-87.5 relative rounded-2xl overflow-hidden bg-orange-50 border-4 border-white shadow-lg">
                <Image
                  src={story.imageUrl as string}
                  alt={page.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Ending Section */}
        <div className="mt-20 text-center p-10 bg-orange-100 rounded-3xl">
          <h2 className="text-3xl font-bold text-orange-800 mb-4">The End</h2>
          <p className="text-orange-700">
            Hope you enjoyed this magical journey!
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="btn btn-warning mt-6"
          >
            Back to top
          </button>
        </div>
      </div>
    </div>
  );
}

export default StoryDetails;
