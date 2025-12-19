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
  serverExternalPackages: ["@neondatabase/serverless"],
};

export default nextConfig;
