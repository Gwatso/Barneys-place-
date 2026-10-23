"use client";

import { useState } from "react";
import type { DayStep } from "@/content/types";

const stoneColours = [
  { bg: "var(--sun)", fg: "var(--charcoal)" },
  { bg: "var(--white)", fg: "var(--charcoal)" },
  { bg: "var(--magenta)", fg: "var(--white)" },
  { bg: "var(--berry)", fg: "var(--white)" },
  { bg: "var(--cream)", fg: "var(--charcoal)" },
];

/** Stepping-stone path through the sample day. */
export function DayStones({ steps }: { steps: DayStep[] }) {
  const [active, setActive] = useState(0);
  const step = steps[active];
  const isLast = active === steps.length - 1;

  return (
    <>
      <ol className="stones">
        {steps.map((s, index) => {
          const colour = stoneColours[index % stoneColours.length];
          return (
            <li key={s.title} className="stone-item">
              <button
                type="button"
                className="stone"
                style={{ ["--stone-bg" as string]: colour.bg, ["--stone-fg" as string]: colour.fg }}
                aria-pressed={active === index}
                aria-label={`Step ${index + 1}: ${s.title}`}
                onClick={() => setActive(index)}
              >
                {index + 1}
              </button>
              <span className="stone-item__title" aria-hidden="true">
                {s.title}
              </span>
            </li>
          );
        })}
      </ol>
      <div className="day-detail" aria-live="polite">
        <div>
          <p className="day-detail__step">
            STEP {active + 1} OF {steps.length}
          </p>
          <h3>{step.title}</h3>
          <p>{step.summary}</p>
        </div>
        <button type="button" className="btn btn--green" onClick={() => setActive(isLast ? 0 : active + 1)}>
          {isLast ? "Start again" : "Next step"}
        </button>
      </div>
    </>
  );
}
