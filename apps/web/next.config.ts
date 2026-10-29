import type { NextConfig } from "next";
import { join } from "path";

const nextConfig: NextConfig = {
  // Let Next compile our local workspace package like first-party code.
  transpilePackages: ["@job-tracker/shared"],
  // Monorepo: trace files from the repo root so the serverless functions
  // include workspace packages (packages/shared) at runtime, not just apps/web.
  outputFileTracingRoot: join(__dirname, "../../"),
};

export default nextConfig;
