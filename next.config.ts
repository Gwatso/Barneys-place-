import type { NextConfig } from "next";

// Static export: every route is pre-rendered to plain HTML in `out/`, so the
// site can be hosted on any static host (Netlify, Cloudflare Pages, GitHub
// Pages, cPanel, S3...). There is no server-side code in this project.
// NEXT_PUBLIC_BASE_PATH serves the site from a sub-path, e.g. "/Barneys-place-"
// for a GitHub Pages project site. Leave it unset for a site at a domain root.
const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim() ?? "";
const basePath = rawBasePath && rawBasePath !== "/" ? `/${rawBasePath.replace(/^\/+|\/+$/g, "")}` : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  images: { unoptimized: true },
};

export default nextConfig;
