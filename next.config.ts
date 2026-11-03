import type { NextConfig } from "next";

/** PortMix CMS: odatle dolaze fotografije koje klijent postavi (next/image ih smanjuje). */
const cms = (() => {
  try {
    return process.env.CMS_URL ? new URL(process.env.CMS_URL) : null;
  } catch {
    return null;
  }
})();

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  images: {
    // Unsplash: podrazumijevane fotografije iz koda (dok ih CMS ne zamijeni).
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      ...(cms
        ? [
            {
              protocol: (cms.protocol === "http:" ? "http" : "https") as "http" | "https",
              hostname: cms.hostname,
              port: cms.port,
              pathname: "/api/mediji/file/**",
            },
          ]
        : []),
    ],
    // Samo WebP: AVIF je ~20–30 % manji, ali ga server pravi višestruko sporije i sa mnogo
    // više memorije (studio je pri zagrijavanju dosegao 508 MB).
    formats: ["image/webp"],
    // Dan, ne mjesec: zamijenjena fotografija u CMS-u treba se pojaviti brzo.
    minimumCacheTTL: 60 * 60 * 24,
    // Lokalno je CMS na localhost-u; u produkciji je na javnoj adresi.
    dangerouslyAllowLocalIP: process.env.NODE_ENV === "development" || process.env.CMS_LOKALNO === "1",
  },
};

export default nextConfig;
