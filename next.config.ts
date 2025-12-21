import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: [
      "react-icons",
      "@clerk/nextjs",
      "yup",
      "@hookform/resolvers",
      "daisyui",
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
  serverExternalPackages: ["@neondatabase/serverless"],
};

export default nextConfig;
