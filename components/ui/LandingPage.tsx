"use client";
import Image from "next/image";
import Link from "next/link";
import { FaBook, FaMagic } from "react-icons/fa";
import { IoCreate } from "react-icons/io5";

function LandingPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-orange-50 to-white">
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <Image
              src="/images/stories.ico"
              width={100}
              height={100}
              alt="Kids Stories Logo"
              className="rounded-lg"
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6">
            Magical Stories for
            <span className="text-orange-500 block">Little Dreamers</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Create personalized, enchanting stories powered by AI. Perfect for
            bedtime, learning, or just pure imagination!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/create-story"
              className="btn btn-primary btn-lg bg-orange-500 hover:bg-orange-600 text-white border-none px-8 py-3 text-lg"
            >
              Start Creating Stories
            </Link>
            <Link
              href="/explore-story"
              className="btn btn-outline btn-lg border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-3 text-lg"
            >
              Explore Stories
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
            Why Choose Kids Stories?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card bg-blue-50 shadow-lg hover:shadow-xl transition-shadow">
              <div className="card-body text-center">
                <div className="text-6xl mb-4">
                  <FaMagic />
                </div>
                <h3 className="card-title text-xl text-gray-800">
                  AI-Powered Magic
                </h3>
                <p className="text-gray-600">
                  Our advanced AI creates unique, engaging stories tailored to
                  your child's interests and age.
                </p>
              </div>
            </div>
            <div className="card bg-blue-50 shadow-lg hover:shadow-xl transition-shadow">
              <div className="card-body text-center">
                <div className="text-6xl mb-4">
                  <FaBook />
                </div>
                <h3 className="card-title text-xl text-gray-800">
                  Educational Fun
                </h3>
                <p className="text-gray-600">
                  Stories that teach valuable lessons while keeping children
                  entertained and engaged.
                </p>
              </div>
            </div>
            <div className="card bg-green-50 shadow-lg hover:shadow-xl transition-shadow">
              <div className="card-body text-center">
                <div className="text-6xl mb-4">
                  <IoCreate />
                </div>
                <h3 className="card-title text-xl text-gray-800">
                  Instant Creation
                </h3>
                <p className="text-gray-600">
                  Generate beautiful stories in seconds with our easy-to-use
                  interface.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-orange-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Choose Your Theme
              </h3>
              <p className="text-gray-600">
                Select from adventure, fantasy, animals, or create your own
                custom theme.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-orange-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Add Details
              </h3>
              <p className="text-gray-600">
                Tell us about your child's favorite characters, colors, or
                special interests.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-orange-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Enjoy the Magic
              </h3>
              <p className="text-gray-600">
                Watch as AI creates a personalized story just for your little
                one!
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-8 bg-orange-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Spark Imagination?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Join thousands of parents creating magical moments with personalized
            stories.
          </p>
          <Link
            href="/sign-up"
            className="btn btn-lg bg-white text-orange-500 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
          >
            Get Started Free
          </Link>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
