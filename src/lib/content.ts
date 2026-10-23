import { site } from "@/config/site";
import type { ContentStatus, GalleryItem } from "@/content/types";

/**
 * The single place where demo mode decides what is published.
 * Components ask these helpers instead of checking `site.demoMode` directly.
 */

/** Verified and approved content is always public; proposed content only in demo mode. */
export function isPublishable(status: ContentStatus): boolean {
  return status !== "proposed" || site.demoMode;
}

/** Keep only the items that may be shown in this build. */
export function publishable<T extends { status: ContentStatus }>(items: readonly T[]): T[] {
  return items.filter((item) => isPublishable(item.status));
}

/** "Proposed" review tags are only shown in the owner preview. */
export function showProposedTag(status: ContentStatus): boolean {
  return site.demoMode && status === "proposed";
}

/**
 * Gallery rules: placeholders exist only to show the owners the layout, so
 * they never appear publicly; photos additionally need confirmed consent.
 */
export function publishableGallery(items: readonly GalleryItem[]): GalleryItem[] {
  return items.filter((item) => {
    if (!isPublishable(item.status)) return false;
    if (item.kind === "placeholder") return site.demoMode;
    if (item.kind === "photo") return item.consentConfirmed;
    return true;
  });
}
