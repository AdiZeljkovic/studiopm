import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Development imagery is served from Unsplash. Once real Studio Portmix
    // photography is available, drop the files into /public/images and update
    // data/images.ts — this pattern can then be removed.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
