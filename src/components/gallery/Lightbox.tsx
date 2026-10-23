"use client";

import { useEffect, useRef, type KeyboardEvent } from "react";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "@/components/icons";
import type { GalleryItem } from "@/content/types";
import { LightboxMedia, kindLabel, mediaBackground } from "./GalleryMedia";

interface LightboxProps {
  items: GalleryItem[];
  index: number;
  categoryLabel: (item: GalleryItem) => string;
  onChange: (index: number) => void;
  onClose: () => void;
}

/**
 * Modal image viewer: focus moves to Close on open, stays trapped inside,
 * and returns to the opening tile on close (handled by the caller).
 * Keys: ← / → browse (wrapping), Esc closes.
 */
export function Lightbox({ items, index, categoryLabel, onChange, onClose }: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const item = items[index];
  const count = items.length;

  useEffect(() => {
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const go = (step: number) => onChange((index + step + count) % count);

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      go(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(-1);
    } else if (event.key === "Tab") {
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>("button:not([disabled]), [href]");
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  }

  const kind = kindLabel(item);
  const badgeClass = item.kind === "photo" ? "badge--photo" : item.kind === "placeholder" ? "badge--placeholder" : "badge--illustration";

  return (
    <div
      ref={dialogRef}
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      aria-describedby="lightbox-desc"
      onKeyDown={onKeyDown}
    >
      <div className="lightbox__top">
        <p className="lightbox__count" aria-live="polite">
          {index + 1} / {count} · {categoryLabel(item)}
        </p>
        <button ref={closeRef} type="button" className="icon-btn" onClick={onClose} aria-label="Close viewer">
          <CloseIcon size={24} />
        </button>
      </div>
      <div className="lightbox__stage">
        <figure className="lightbox__figure">
          <div key={item.id} className="lightbox__media" style={{ background: mediaBackground(item) }}>
            <LightboxMedia item={item} />
          </div>
          <figcaption className="lightbox__caption">
            <span>
              <span id="lightbox-title" className="lightbox__title">
                {item.title}
              </span>
              <span id="lightbox-desc" className="lightbox__desc">
                {item.caption}
              </span>
            </span>
            <span className={`badge ${badgeClass}`}>{kind}</span>
          </figcaption>
        </figure>
        <div className="lightbox__controls">
          <button type="button" className="icon-btn lightbox__prev" onClick={() => go(-1)} aria-label="Previous picture">
            <ChevronLeftIcon size={24} />
          </button>
          <button type="button" className="icon-btn lightbox__next" onClick={() => go(1)} aria-label="Next picture">
            <ChevronRightIcon size={24} />
          </button>
        </div>
      </div>
      <p className="lightbox__hint">Use ← → to browse and Esc to close</p>
    </div>
  );
}
