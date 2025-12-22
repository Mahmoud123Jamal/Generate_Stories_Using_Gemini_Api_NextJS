"use client";
import Header from "@/components/layouts/Header";
import { useRouter } from "next/navigation";
import { FiBookOpen, FiCpu, FiUsers, FiStar } from "react-icons/fi";

function About() {
  const router = useRouter();
  const handleAddStory = () => router.push("/dashboard/add-new-story");

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6">
            Crafting Magic with{" "}
            <span className="text-orange-600">AI Stories</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We believe everyone has a story to tell. Our platform combines human
            creativity with cutting-edge artificial intelligence to turn simple
            ideas into immersive adventures.
          </p>
        </div>
        {/* Subtle Background Accent */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-orange-200 rounded-full blur-3xl opacity-30"></div>
      </section>

      {/* Features/Stats Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FiCpu className="text-2xl text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">AI Powered</h3>
            <p className="text-gray-500">
              Utilizing GPT-4 models to generate logical, creative, and
              personalized narratives.
            </p>
          </div>

          <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FiBookOpen className="text-2xl text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">3 Genres</h3>
            <p className="text-gray-500">
              From Educational to Bedtime stories, our generator adapts to 3
              theme you imagine.
            </p>
          </div>

          <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FiUsers className="text-2xl text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Community Driven
            </h3>
            <p className="text-gray-500">
              Share your stories with others and explore a library of
              AI-generated wonders.
            </p>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-20 bg-gray-900 text-white rounded-[3rem] mx-4 md:mx-10 mb-20 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 flex items-center gap-3">
              <FiStar className="text-orange-500" /> Our Mission
            </h2>
            <p className="text-gray-400 text-lg mb-6 leading-relaxed">
              In a world filled with digital noise, we want to provide a space
              where imagination flourishes. Whether you are a parent creating a
              unique bedtime story for your child or a writer looking for a
              creative spark, we provide the tools to make it happen.
            </p>
            <button
              onClick={handleAddStory}
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-full font-bold transition-all cursor-pointer"
            >
              Start Writing Now
            </button>
          </div>
          <div className="flex-1 relative">
            <div className="w-full h-64 md:h-80 bg-linear-to-tr from-orange-500 to-orange-300 rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 flex items-center justify-center">
              <FiBookOpen className="text-white text-8xl opacity-50" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
