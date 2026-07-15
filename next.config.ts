import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // All imagery is served from /public. No remote patterns are configured on
    // purpose: production assets must be local, never hotlinked.
    formats: ["image/avif", "image/webp"],
    deviceSizes: [375, 430, 768, 1024, 1280, 1440, 1920],
    imageSizes: [96, 160, 240, 320, 480, 640],
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async redirects() {
    return [
      // The root route always lands on the default locale.
      { source: "/", destination: "/cs", permanent: false },
    ];
  },
};

export default nextConfig;
