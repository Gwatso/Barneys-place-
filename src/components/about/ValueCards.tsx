"use client";

import { useState } from "react";
import { ValueArt } from "@/components/illustrations/learning";
import type { SchoolValue } from "@/content/types";

/** Value cards with an "in the classroom" disclosure. */
export function ValueCards({ values }: { values: SchoolValue[] }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="auto-grid" style={{ ["--min" as string]: "320px", marginTop: 44 }}>
      {values.map((value) => {
        const isOpen = open === value.name;
        const id = `value-${value.icon}`;
        return (
          <article key={value.name} className={`card card--lift value-card accent-${value.accent}`}>
            <ValueArt name={value.icon} />
            <h3>{value.name}</h3>
            <p>{value.meaning}</p>
            {isOpen && (
              <p id={id} className="example">
                In practice: {value.inPractice}
              </p>
            )}
            <button
              type="button"
              className="link-btn"
              aria-expanded={isOpen}
              aria-controls={isOpen ? id : undefined}
              onClick={() => setOpen(isOpen ? null : value.name)}
            >
              {isOpen ? "Hide" : "How it looks in class"}
            </button>
          </article>
        );
      })}
    </div>
  );
}
