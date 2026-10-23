import { site } from "@/config/site";

/**
 * Prefix a file in /public with the site's base path. next/link does this
 * automatically, but next/image and plain URLs do not.
 */
export function assetPath(path: string): string {
  return `${site.basePath}${path.startsWith("/") ? path : `/${path}`}`;
}
