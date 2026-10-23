import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export const dynamic = "force-static";

/** The owner preview must never be indexed; the public build allows crawling. */
export default function robots(): MetadataRoute.Robots {
  if (site.demoMode) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    ...(site.siteUrl ? { sitemap: `${site.siteUrl}/sitemap.xml` } : {}),
  };
}
