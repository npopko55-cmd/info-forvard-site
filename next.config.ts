import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/info-forvard-site",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
