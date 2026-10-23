"use client";

import { useState, type ReactNode } from "react";
import { Pip } from "@/components/illustrations/brand";
import type { SchoolValue } from "@/content/types";

/** Six value "dots" (from the painted dots on the school wall) and Pip's speech bubble. */
export function ValueDots({ values, showMascot, children }: { values: SchoolValue[]; showMascot: boolean; children?: ReactNode }) {
  const [active, setActive] = useState(0);
  const value = values[active];
  return (
    <div className="values-layout">
      <div>
        {children}
        <div className="values-speaker">
          {showMascot && <Pip className="values-speaker__pip" waving={false} />}
          <div className={`speech accent-${value.accent}`} aria-live="polite">
            <p className="speech__title">{value.name}</p>
            <p>{value.meaning}</p>
          </div>
        </div>
      </div>
      <ul className="value-dots" aria-label="Choose a value">
        {values.map((v, index) => (
          <li key={v.name}>
            <button type="button" className={`value-dot accent-${v.accent}`} aria-pressed={active === index} onClick={() => setActive(index)}>
              {v.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
