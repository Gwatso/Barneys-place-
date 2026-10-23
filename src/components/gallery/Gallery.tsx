"use client";

import { useRef, useState } from "react";
import type { GalleryCategory, GalleryItem } from "@/content/types";
import { TileMedia, kindLabel, mediaBackground } from "./GalleryMedia";
import { Lightbox } from "./Lightbox";

interface Category {
  id: GalleryCategory;
  label: string;
  accent: string;
}

export function Gallery({ items, categories }: { items: GalleryItem[]; categories: readonly Category[] }) {
  const [filter, setFilter] = useState<GalleryCategory | "all">("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const usedCategories = categories.filter((c) => items.some((i) => i.category === c.id));
  const shown = filter === "all" ? items : items.filter((i) => i.category === filter);
  const labelFor = (item: GalleryItem) => categories.find((c) => c.id === item.category)?.label ?? "";

  const close = () => {
    setOpenIndex(null);
    // Return focus to the tile that opened the viewer.
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  const chips = [{ id: "all" as const, label: "All", accent: "charcoal" }, ...usedCategories];

  return (
    <>
      <div role="group" aria-label="Filter pictures by category" className="chip-row">
        {chips.map((chip) => (
          <button
            key={chip.id}
            type="button"
            className={`chip accent-${chip.accent}`}
            aria-pressed={filter === chip.id}
            onClick={() => {
              setFilter(chip.id);
              setOpenIndex(null);
            }}
          >
            <span className="chip__dot" aria-hidden="true" />
            {chip.label}
            <span className="chip__count">{chip.id === "all" ? items.length : items.filter((i) => i.category === chip.id).length}</span>
          </button>
        ))}
      </div>

      <p className="muted" aria-live="polite" style={{ marginTop: 12, fontSize: "0.9375rem", fontWeight: 600 }}>
        Showing {shown.length} of {items.length} pictures
      </p>

      <ul className="gallery-grid" key={filter}>
        {shown.map((item, index) => {
          const kind = kindLabel(item);
          const badgeClass = item.kind === "photo" ? "badge--photo" : item.kind === "placeholder" ? "badge--placeholder" : "badge--illustration";
          return (
            <li key={item.id} className={item.shape ? `shape-${item.shape}` : undefined}>
              <button
                type="button"
                className="tile"
                style={{ ["--tile-bg" as string]: mediaBackground(item) }}
                aria-label={`View full-screen: ${item.title} (${kind.toLowerCase()})`}
                aria-haspopup="dialog"
                onClick={(event) => {
                  triggerRef.current = event.currentTarget;
                  setOpenIndex(index);
                }}
              >
                <TileMedia item={item} />
                <span className={`badge tile__badge ${badgeClass}`} aria-hidden="true">
                  {kind}
                </span>
                <span className="tile__title" aria-hidden="true">
                  {item.title}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {openIndex !== null && shown[openIndex] && (
        <Lightbox items={shown} index={openIndex} categoryLabel={labelFor} onChange={setOpenIndex} onClose={close} />
      )}
    </>
  );
}
