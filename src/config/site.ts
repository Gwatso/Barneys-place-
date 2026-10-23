/**
 * Site-wide feature configuration.
 *
 * Everything that changes between the owner-preview build and the public
 * launch build is decided here, so no other file needs to check environment
 * variables. Values are read at build time (the site is a static export).
 *
 *   NEXT_PUBLIC_DEMO_MODE        "false" turns owner-preview mode off (default: on)
 *   NEXT_PUBLIC_SITE_URL         the confirmed public domain (default: unknown)
 *   NEXT_PUBLIC_ENQUIRY_ENDPOINT an approved form-delivery URL (default: none)
 */

function readFlag(value: string | undefined, fallback: boolean): boolean {
  if (value === undefined || value.trim() === "") return fallback;
  return !["false", "0", "off", "no"].includes(value.trim().toLowerCase());
}

function readUrl(value: string | undefined): string | null {
  if (!value || value.trim() === "") return null;
  try {
    const url = new URL(value.trim());
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    return url.toString().replace(/\/$/, "");
  } catch {
    return null;
  }
}

const demoMode = readFlag(process.env.NEXT_PUBLIC_DEMO_MODE, true);
const enquiryEndpoint = readUrl(process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT);

export type EnquiryDelivery =
  /** Validates and shows a clearly-labelled demonstration result. Sends nothing. */
  | { kind: "demo" }
  /** POSTs JSON to an approved endpoint; success only on a 2xx response. */
  | { kind: "endpoint"; url: string }
  /** No approved delivery method: the form is replaced by call options. */
  | { kind: "none" };

export const site = {
  /** Owner-preview mode: preview bar, "Proposed" tags and sample content. */
  demoMode,
  /** Confirmed public origin, e.g. "https://www.example.co.zw". null = not yet known. */
  siteUrl: readUrl(process.env.NEXT_PUBLIC_SITE_URL),
  /** How the admissions enquiry form behaves. */
  enquiry: (demoMode
    ? { kind: "demo" }
    : enquiryEndpoint
      ? { kind: "endpoint", url: enquiryEndpoint }
      : { kind: "none" }) as EnquiryDelivery,
  /** Show Pip, the proposed mascot, in illustrations. */
  showMascot: true,
} as const;

export type SiteConfig = typeof site;
