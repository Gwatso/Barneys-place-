import type { NextConfig } from "next";

// Static export: every route is pre-rendered to plain HTML in `out/`, so the
// site can be hosted on any static host (Netlify, Cloudflare Pages, GitHub
// Pages, cPanel, S3...). There is no server-side code in this project.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  images: { unoptimized: true },
};

export default nextConfig;
