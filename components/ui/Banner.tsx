"use client";
import { FiBookOpen, FiZap } from "react-icons/fi";
import Link from "next/link";

function Banner() {
  return (
    <div className="hero p-8  w-full  ">
      <div className="hero-content flex-col lg:flex-row-reverse p-0">
        <div className="text-center lg:text-left p-4 max-w-sm">
          <div className="w-full h-40 bg-yellow-200 rounded-lg flex items-center justify-center text-orange-600">
            <FiBookOpen className="w-16 h-16 animate-bounce" />
          </div>
          <p className="mt-2 text-sm italic">
            Imagine amazing new worlds instantly!
          </p>
        </div>

        <div className="max-w-xl lg:pr-12">
          <h1 className="text-xl text-center lg:text-left lg:text-5xl font-extrabold leading-tight ">
            <span className="text-yellow-600 block ">Ignite Imagination</span>
            <span className="text-orange-500 mt-2">With AI Stories!</span>
          </h1>

          <p className="py-6 text-lg font-semibold ">
            Welcome to the magical place where kids become authors! Tell us the
            characters and setting, and our AI instantly crafts a unique,
            exciting adventure just for you.
          </p>

          <Link href="/create-story">
            <button className="btn btn-warning btn-lg shadow-xl hover:bg-yellow-500 transition-all duration-300">
              <FiZap className="w-6 h-6 mr-2" />
              Start Your Story Now!
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Banner;
