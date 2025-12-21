"use client";

import Banner from "@/components/ui/Banner";
import { previewStory } from "@/types/StoryType";
import Image from "next/image";
import { useEffect, useState } from "react";

function Page() {
  const [stories, setStories] = useState<previewStory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    fetch("/api/my-stories")
      .then((res) => res.json())
      .then((data) => setStories(data.stories))
      .catch((err) => console.error("Fetch stories error:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <Banner />

      {loading && (
        <p className="text-center mt-6 text-lg font-medium">
          Loading stories...
        </p>
      )}

      {!loading && stories.length === 0 && (
        <p className="text-center mt-6 text-lg font-medium">No stories found</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 py-8">
        {stories.map((story) => (
          <div
            key={story.storyId}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
          >
            <figure className="relative h-48">
              <Image
                src={story.imageUrl as string}
                alt={story.content.story.title}
                fill
                className="object-cover"
              />
            </figure>

            <div className="card-body">
              <h2 className="card-title">{story.content.story.title}</h2>

              <p className="text-sm text-gray-600 line-clamp-3">
                {story.content.story.description}
              </p>

              <div className="card-actions justify-end mt-4">
                <button className="btn btn-primary btn-sm">Read Story</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page;
