"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiZap } from "react-icons/fi";

function StoryList() {
  const router = useRouter();

  const [stories, setStories] = useState([]);

  const handleNewStory = () => {
    router.push("/create-story");
  };
  return (
    <div className="mt-1 w-full ">
      {stories.length === 0 ? (
        <div className="flex flex-col items-center">
          <Image
            src="/images/stories.ico"
            width={150}
            height={150}
            alt="logo"
            className="animate-pulse"
          />
          <h1 className="text-xl">No Stories found !</h1>

          <button
            onClick={handleNewStory}
            className="btn btn-warning btn-md mt-2 shadow-xl hover:bg-yellow-500 transition-all duration-300"
          >
            <FiZap className="w-6 h-6 mr-2" />
            Create new Story
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <h1 className="text-2xl">Story List</h1>
          {stories.map((story) => (
            <div key={1}></div>
            // <div key={story.id} className="border border-gray-300 p-4 mb-4">
            //   <h2 className="text-lg font-semibold">{story.title}</h2>
            //   <p className="text-gray-600">{story.description}</p>
            // </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default StoryList;
