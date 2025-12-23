"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiBookOpen, FiArrowRight, FiCompass } from "react-icons/fi";
import axios from "axios";
import { previewStory } from "@/types/StoryType";
import Loader from "@/components/ui/loader";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";

function ExploreStories() {
  const router = useRouter();
  const [stories, setStories] = useState<previewStory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getAllStories = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/all-stories?t=${Date.now()}`);
      setStories(res.data);
    } catch (error) {
      console.error("Error fetching all stories:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getAllStories();
  }, [getAllStories]);

  if (loading) return <Loader />;

  return (
    <>
      <Header />
      <div className="min-h-screen p-5 md:px-10 lg:px-20 bg-gray-50">
        <div className="flex justify-between items-center mb-10 mt-5">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-orange-600 flex items-center gap-3">
              <FiCompass className="animate-pulse" /> Explore Community Stories
            </h1>
            <p className="text-gray-500 mt-2">
              Discover magical journeys created by our community
            </p>
          </div>
        </div>

        {stories.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-dashed">
            <p className="text-xl text-gray-400">
              No stories found in the community yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10">
            {stories.map((story) => (
              <div
                key={story.storyId}
                className="card bg-base-100 shadow-xl border border-gray-100 hover:shadow-2xl transition-all cursor-pointer group"
                onClick={() => router.push(`/story/${story.storyId}`)}
              >
                <figure className="relative h-56 w-full overflow-hidden bg-orange-50">
                  {story.imageUrl ? (
                    <Image
                      src={story.imageUrl as string}
                      alt={story.content?.story?.title || "Story Image"}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-orange-200">
                      <FiBookOpen size={64} />
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <span className="badge badge-warning font-bold shadow-sm uppercase text-[10px]">
                      {story.content?.story?.type}
                    </span>
                  </div>
                </figure>

                <div className="card-body p-5">
                  <h2 className="card-title text-xl font-bold text-gray-800 truncate">
                    {story.content?.story?.title}
                  </h2>

                  <div className="flex flex-col gap-1 mt-2">
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <span className="font-semibold text-orange-500">
                        Target Age :
                      </span>
                      {story.content?.story?.ageGroup} Years
                    </p>
                  </div>

                  <div className="card-actions justify-end mt-4 border-t pt-4">
                    <button className="flex items-center gap-2 text-orange-600 font-bold group-hover:gap-4 transition-all">
                      Read Story <FiArrowRight />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default ExploreStories;
