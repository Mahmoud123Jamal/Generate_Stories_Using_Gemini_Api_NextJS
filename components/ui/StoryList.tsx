"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiZap, FiBookOpen, FiArrowRight } from "react-icons/fi";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { previewStory } from "@/types/StoryType";
import Loader from "@/components/ui/loader";

function StoryList() {
  const router = useRouter();
  const { user } = useUser();
  const [stories, setStories] = useState<previewStory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (user) {
      getUserStories();
    }
  }, [user]);

  const getUserStories = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/my-stories");
      const data = Array.isArray(res.data) ? res.data : res.data.stories || [];
      setStories(data);
    } catch (error) {
      console.error("Error fetching stories:", error);
      setStories([]);
    } finally {
      setLoading(false);
    }
  };

  const handleNewStory = () => {
    router.push("/dashboard/add-new-story");
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="mt-5 w-full px-5">
      {stories.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-100 border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50/50">
          <Image
            src="/images/stories.ico"
            width={120}
            height={120}
            alt="logo"
            className="animate-bounce duration-2000"
          />
          <h1 className="text-2xl font-bold text-gray-700 mt-4">
            Your library is empty
          </h1>
          <p className="text-gray-500 mb-6">
            Start your journey by creating your first AI story!
          </p>

          <button
            onClick={handleNewStory}
            className="btn btn-warning btn-md shadow-xl hover:scale-105 transition-all"
          >
            <FiZap className="w-5 h-5 mr-2" />
            Create First Story
          </button>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-6 px-2">
            <h1 className="text-3xl font-extrabold text-orange-600 flex items-center gap-2">
              <FiBookOpen /> My Stories
            </h1>
            <button
              onClick={handleNewStory}
              className="btn btn-warning btn-sm shadow-md hover:bg-yellow-500"
            >
              <FiZap /> New Story
            </button>
          </div>

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
                    <span className="badge badge-warning font-bold shadow-sm">
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
                      {story.content?.story?.ageGroup}
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
        </div>
      )}
    </div>
  );
}

export default StoryList;
