import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["matddang.s3.ap-northeast-2.amazonaws.com"],
  },
};

export default nextConfig;
