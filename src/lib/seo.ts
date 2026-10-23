import type { Metadata } from "next";
import { site } from "@/config/site";
import { fullAddress, pages, school, type PageKey } from "@/content/school";

/**
 * Page metadata. Canonical URLs and the Open Graph image need an absolute
 * address, so they are only emitted once NEXT_PUBLIC_SITE_URL is configured.
 * The owner preview is always marked noindex so it cannot leak into search.
 */
export function pageMetadata(key: PageKey): Metadata {
  const page = pages[key];
  const title = key === "home" ? { absolute: page.title } : page.title;
  const fullTitle = key === "home" ? page.title : `${page.title} | ${school.plainName} ECD Centre, Bindura`;

  return {
    title,
    description: page.description,
    alternates: site.siteUrl ? { canonical: page.path } : undefined,
    openGraph: {
      type: "website",
      locale: "en_ZW",
      siteName: school.plainName,
      title: fullTitle,
      description: page.description,
      url: site.siteUrl ? page.path : undefined,
      images: site.siteUrl
        ? [{ url: "/og-image.png", width: 1200, height: 630, alt: `${school.plainName} — Early Childhood Development Centre, Aerodrome Medium, Bindura` }]
        : undefined,
    },
    twitter: { card: site.siteUrl ? "summary_large_image" : "summary", title: fullTitle, description: page.description },
    robots: site.demoMode ? { index: false, follow: false } : { index: true, follow: true },
  };
}

/**
 * schema.org structured data using only owner-supplied facts: name, type,
 * address and telephone numbers. No URL, hours, geo-coordinates, ratings or
 * email are included until they are confirmed.
 */
export function organisationJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Preschool",
    name: school.plainName,
    description: `${school.type} in ${school.address.suburb}, ${school.address.town}, ${school.address.country}.`,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${school.address.stand}, ${school.address.suburb}`,
      addressLocality: school.address.town,
      addressCountry: school.address.countryCode,
    },
    telephone: school.phones.map((p) => p.e164),
    ...(site.siteUrl ? { url: site.siteUrl } : {}),
  };
}

/** Serialise JSON-LD safely for a <script> tag (no "</script>" breakouts). */
export function jsonLdString(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export { fullAddress };
