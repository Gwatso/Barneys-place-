import { gallery, navOrder, pages, type PageKey } from "@/content/school";
import { publishableGallery } from "@/lib/content";
import type { NavItem } from "@/components/layout/Header";

const accents: Record<PageKey, string> = {
  home: "sun",
  about: "berry",
  learning: "leaf",
  admissions: "magenta",
  gallery: "teal",
  contact: "charcoal",
};

/** The gallery link is hidden when no gallery content may be published. */
export function hasGalleryContent(): boolean {
  return publishableGallery(gallery).length > 0;
}

export function navItems(): NavItem[] {
  return navOrder
    .filter((key) => key !== "gallery" || hasGalleryContent())
    .map((key) => ({ href: pages[key].path, label: pages[key].label, accent: accents[key] }));
}
