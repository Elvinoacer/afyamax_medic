import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Local imagery is pre-sized — skip the optimizer so the site runs
    // identically on any host without native image dependencies.
    unoptimized: true,
  },
};

export default nextConfig;
