import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. React Compiler for zero-cost reactive optimizations
  reactCompiler: true,

  // 2. Gzip / Brotli compression
  compress: true,

  // 3. Power-on image optimization (AVIF + WebP next-gen formats)
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days image cache
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // 4. Custom caching headers for Vercel edge CDN
  async headers() {
    return [
      {
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/hero-icons/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/bg-art/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/certificates/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/portfolio/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:file((?:hero-main|logo|facebook|instagram|google|tik-tok|social-media)\\.(?:png|jpg|jpeg|webp|svg))",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // 5. Allow LAN devices for local testing
  allowedDevOrigins: [
    "192.168.1.4",
    "192.168.137.1",
    "192.168.1.*",
    "192.168.137.*",
    "localhost",
  ],
};

export default nextConfig;
