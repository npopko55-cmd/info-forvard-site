import type { NextConfig } from "next";

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  // Пусто для боевого сайта на reg.ru; задаётся только для превью в подпапке
  ...(base ? { basePath: base, assetPrefix: base } : {}),
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
