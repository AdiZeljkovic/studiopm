import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  images: {
    // Development imagery is served from Unsplash. Once real Studio PortMix
    // photography is available, drop the files into /public/images and update
    // data/images.ts — this pattern can then be removed.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
    formats: ["image/avif", "image/webp"],
    // Unsplash ids and local files never change content, so optimised
    // variants can be cached for a long time.
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;
