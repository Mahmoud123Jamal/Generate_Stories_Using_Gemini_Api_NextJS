"use client";

import React, { useState, useEffect } from "react";
import { UserProfile, useUser } from "@clerk/nextjs";
import { FiUser, FiSettings, FiShield, FiBell, FiTrash2 } from "react-icons/fi";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loader from "@/components/ui/loader";

function Settings() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDeleteAccount = async () => {
    if (!user) return;
    const confirmed = window.confirm("Are you sure? This is permanent.");
    if (confirmed) {
      try {
        setIsDeleting(true);
        const email = user.primaryEmailAddress?.emailAddress;
        const userId = user.id;
        await axios.delete(
          `/api/delete-user-data?email=${email}&userId=${userId}`
        );
        window.location.assign("/");
      } catch (error) {
        console.error("Error:", error);
        alert("Action failed. Try logging in again.");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  if (!mounted || !isLoaded) {
    return <Loader />;
  }

  if (!isSignedIn) {
    router.push("/sign-in");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white border-b border-gray-100 p-6 md:px-10 lg:px-20 mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-orange-600 flex items-center gap-3">
          <FiSettings className="animate-spin-slow text-orange-500" />
          Settings
        </h1>
        <p className="text-gray-500 text-sm md:text-base mt-1">
          Manage your account and preferences
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-20">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/3 space-y-6">
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-800">
                <FiUser className="text-orange-500" /> Account Dashboard
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
                <button className="btn btn-ghost btn-sm md:btn-md justify-start gap-3 text-gray-600 hover:bg-orange-50">
                  <FiBell /> Notifications
                </button>
                <button className="btn btn-ghost btn-sm md:btn-md justify-start gap-3 text-gray-600 hover:bg-orange-50">
                  <FiShield /> Security
                </button>
                <div className="divider my-1 hidden lg:flex"></div>
                <button
                  onClick={handleDeleteAccount}
                  disabled={isDeleting}
                  className={`btn btn-ghost btn-sm md:btn-md justify-start gap-3 text-red-500 hover:bg-red-50 sm:col-span-2 lg:col-span-1 ${
                    isDeleting ? "loading" : ""
                  }`}
                >
                  <FiTrash2 /> {isDeleting ? "Processing..." : "Delete Account"}
                </button>
              </div>
            </div>
            <div className="bg-linear-to-br from-orange-500 to-orange-600 p-6 rounded-3xl shadow-lg text-white">
              <h3 className="font-bold text-xl">Pro Plan</h3>
              <p className="text-orange-100 text-sm mt-2 opacity-90">
                Unlimited AI generations active.
              </p>
              <button className="btn btn-sm btn-white mt-4 bg-white text-orange-600 border-none hover:bg-orange-50">
                Manage Billing
              </button>
            </div>
          </div>
          <div className="w-full bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="w-full">
              <UserProfile
                routing="hash"
                appearance={{
                  elements: {
                    rootBox:
                      "w-full flex justify-center items-start max-w-full",
                    card: "shadow-none border-none w-full m-0 rounded-none bg-transparent max-w-full",
                    navbar:
                      "hidden md:flex bg-gray-50 border-r border-gray-100 p-4 min-w-[200px] lg:min-w-[250px]",
                    navbarMobileMenuButton: "text-orange-600",
                    scrollBox:
                      "w-full max-w-full rounded-none shadow-none bg-white",
                    pageScrollBox: "w-full max-w-full p-4 md:p-8 lg:p-12",
                    userProfilePage: "w-full max-w-full",
                    profileSection:
                      "flex flex-col md:flex-row gap-6 items-start md:items-center",
                    headerTitle: "text-xl md:text-2xl font-bold text-gray-800",
                    headerSubtitle: "text-gray-500 text-sm",
                    formButtonPrimary:
                      "bg-orange-600 hover:bg-orange-700 text-sm py-2 px-4 rounded-xl",
                    formFieldInput:
                      "rounded-xl border-gray-200 focus:border-orange-500 w-full",
                  },
                  variables: {
                    colorPrimary: "#EA580C",
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
