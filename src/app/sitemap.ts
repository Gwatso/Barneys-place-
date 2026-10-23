import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { navOrder, pages } from "@/content/school";
import { hasGalleryContent } from "@/lib/navigation";

export const dynamic = "force-static";

/**
 * Sitemap URLs must be absolute, so the sitemap stays empty until the real
 * domain is configured (NEXT_PUBLIC_SITE_URL) and demo mode is off.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.siteUrl || site.demoMode) return [];
  return navOrder
    .filter((key) => key !== "gallery" || hasGalleryContent())
    .map((key) => ({
      url: `${site.siteUrl}${pages[key].path}`,
      changeFrequency: "monthly",
      priority: key === "home" ? 1 : 0.7,
    }));
}
