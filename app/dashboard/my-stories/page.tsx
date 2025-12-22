"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  FiArrowRight,
  FiBookOpen,
  FiSearch,
  FiFilter,
  FiRefreshCw,
} from "react-icons/fi";

import Banner from "@/components/ui/Banner";
import Loader from "@/components/ui/loader";
import { previewStory } from "@/types/StoryType";

import { StoryFilterValues } from "@/types/StoryType";
import { storyFilterSchema } from "@/lib/validators";
import { getFilteredStories } from "@/lib/storyUtils";

function MyStories() {
  const [stories, setStories] = useState<previewStory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const { register, watch, setValue, reset } = useForm<StoryFilterValues>({
    resolver: yupResolver(storyFilterSchema),
    defaultValues: {
      searchTerm: "",
      ageGroups: [],
      storyTypes: [],
    },
  });

  const formValues = watch();

  const fetchStories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/my-stories");
      if (!res.ok) throw new Error("Server is taking too long to respond.");
      const data = await res.json();
      setStories(data.stories || []);
    } catch (err: any) {
      setError(err.message || "Failed to connect to the database");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  const filteredStories = useMemo(
    () => getFilteredStories(stories, formValues),
    [stories, formValues]
  );

  const handleClearFilters = () => reset();

  return (
    <div className="min-h-screen bg-gray-50">
      <Banner />
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1 space-y-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
          <div className="flex items-center gap-2 text-orange-600 font-bold text-xl mb-4">
            <FiFilter /> Filters
          </div>

          <div className="relative">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              {...register("searchTerm")}
              type="text"
              placeholder="Search stories..."
              className="input input-bordered w-full pl-10 focus:border-orange-500"
            />
          </div>

          <div>
            <h3 className="font-bold text-gray-700 mb-3">Target Age</h3>
            <div className="space-y-2">
              {["2-5", "5-7", "7-10"].map((age) => (
                <label
                  key={age}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    value={age}
                    {...register("ageGroups")}
                    className="checkbox checkbox-warning checkbox-sm"
                  />
                  <span className="text-gray-600 group-hover:text-orange-500 transition-colors">
                    {age} Years
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-gray-700 mb-3">Story Type</h3>
            <div className="space-y-2">
              {["STORY BOOK", "BED STORY", "EDUCATIONAL"].map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    value={type}
                    {...register("storyTypes")}
                    className="checkbox checkbox-warning checkbox-sm"
                  />
                  <span className="text-gray-600 group-hover:text-orange-500 transition-colors">
                    {type}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={handleClearFilters}
            className="btn btn-ghost btn-sm w-full text-gray-400"
          >
            Clear All Filters
          </button>
        </aside>

        <main className="lg:col-span-3">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader />
              <p className="mt-4 text-gray-500 animate-pulse text-sm italic">
                Fetching your stories...
              </p>
            </div>
          ) : error ? (
            <div className="text-center py-20 bg-white rounded-3xl border-2 border-red-100 shadow-sm">
              <FiRefreshCw className="text-red-500 text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Connection Issues
              </h3>
              <p className="text-gray-500 mb-6 text-sm">{error}</p>
              <button onClick={fetchStories} className="btn btn-warning gap-2">
                <FiRefreshCw className={loading ? "animate-spin" : ""} /> Try
                Again
              </button>
            </div>
          ) : filteredStories.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
              <p className="text-xl text-gray-400 font-medium">
                No stories found matching your criteria
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredStories.map((story) => (
                <div
                  key={story.storyId}
                  className="card bg-white shadow-sm border border-gray-100 hover:shadow-xl transition-all cursor-pointer group overflow-hidden"
                  onClick={() => router.push(`/story/${story.storyId}`)}
                >
                  <figure className="relative h-48 w-full bg-orange-50">
                    {story.imageUrl ? (
                      <Image
                        src={story.imageUrl}
                        alt="Story"
                        fill
                        className="object-cover group-hover:scale-105 transition-all"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full text-orange-200">
                        <FiBookOpen size={48} />
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <span className="badge badge-warning font-bold shadow-sm px-3 py-3 uppercase text-[10px]">
                        {story.content?.story?.type}
                      </span>
                    </div>
                  </figure>
                  <div className="card-body p-6">
                    <h2 className="card-title text-xl font-extrabold text-gray-800">
                      {story.content?.story?.title}
                    </h2>
                    <p className="text-gray-500 text-sm font-medium">
                      <span className="text-orange-500">Target Age:</span>{" "}
                      {story.content?.story?.ageGroup} Years
                    </p>
                    <div className="card-actions justify-end mt-4 border-t pt-4">
                      <button className="flex items-center gap-2 text-orange-600 font-bold group-hover:gap-4 transition-all">
                        Read Now <FiArrowRight />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default MyStories;
