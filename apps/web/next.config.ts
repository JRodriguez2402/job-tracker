import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Let Next compile our local workspace package like first-party code.
  transpilePackages: ["@job-tracker/shared"],
};

export default nextConfig;
