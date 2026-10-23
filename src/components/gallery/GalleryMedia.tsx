import Image from "next/image";
import { CameraIcon } from "@/components/icons";
import { LearningArt } from "@/components/illustrations/learning";
import type { GalleryItem } from "@/content/types";

export function kindLabel(item: GalleryItem): string {
  if (item.kind === "photo") return "Photo";
  return item.kind === "placeholder" ? "Photo placeholder" : "Illustration";
}

export function altText(item: GalleryItem): string {
  if (item.kind === "photo") return item.alt;
  if (item.kind === "placeholder") return `Empty frame reserved for an authorised photograph: ${item.title}`;
  return `Original illustration: ${item.title}`;
}

export function mediaBackground(item: GalleryItem): string {
  return item.kind === "illustration" ? item.background : "#F3EEE6";
}

/** Tile-sized artwork for the grid. */
export function TileMedia({ item }: { item: GalleryItem }) {
  if (item.kind === "photo") {
    return <Image src={item.src} alt="" width={item.width} height={item.height} loading="lazy" sizes="(min-width: 1081px) 25vw, (min-width: 641px) 33vw, 50vw" />;
  }
  if (item.kind === "placeholder") {
    return (
      <span className="tile__placeholder" aria-hidden="true">
        <CameraIcon size={44} />
        Photo to come
      </span>
    );
  }
  return (
    <span className={`tile__art ${item.illustration === "pip" ? "tile__art--pip" : ""}`} aria-hidden="true">
      <LearningArt name={item.illustration} />
    </span>
  );
}

/** Large artwork for the lightbox. */
export function LightboxMedia({ item }: { item: GalleryItem }) {
  if (item.kind === "photo") {
    return <Image src={item.src} alt={item.alt} width={item.width} height={item.height} sizes="100vw" />;
  }
  if (item.kind === "placeholder") {
    return (
      <span className="lightbox__placeholder" role="img" aria-label={altText(item)}>
        <CameraIcon size={72} />
        <strong>Authorised school photo goes here</strong>
        <span>{item.suggestion}</span>
      </span>
    );
  }
  return (
    <span className="lightbox__art" role="img" aria-label={altText(item)}>
      <LearningArt name={item.illustration} />
    </span>
  );
}
