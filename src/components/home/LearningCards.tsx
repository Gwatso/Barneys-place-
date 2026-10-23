"use client";

import { useState } from "react";
import { LearningArt } from "@/components/illustrations/learning";
import type { LearningArea } from "@/content/types";

/** Bento of learning areas; each card reveals a "you might see" example. */
export function LearningCards({ areas }: { areas: LearningArea[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const last = areas.length - 1;

  return (
    <div className="bento">
      {areas.map((area, index) => {
        const open = openId === area.id;
        // First and last cards are wide; the first is solid, the dark one inverts.
        const wide = index === 0 || index === last;
        const solid = index === 0 || area.accent === "charcoal";
        const exampleId = `example-${area.id}`;
        const classes = [
          "learn-card card--lift",
          `accent-${area.accent}`,
          wide ? "learn-card--wide" : "",
          solid ? "learn-card--solid" : "",
        ].join(" ");
        return (
          <article key={area.id} className={classes}>
            <LearningArt name={area.icon} className="learn-card__art" dark={solid && area.accent === "charcoal"} />
            <div className="learn-card__body">
              <h3>{area.shortTitle}</h3>
              <p>{area.summary}</p>
              {open && (
                <p id={exampleId} className="example">
                  You might see: {area.example}
                </p>
              )}
              <button
                type="button"
                className="pill-btn learn-card__toggle"
                aria-expanded={open}
                aria-controls={open ? exampleId : undefined}
                onClick={() => setOpenId(open ? null : area.id)}
              >
                {open ? "Hide example" : "See an example"}
                <span aria-hidden="true">{open ? "–" : "+"}</span>
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
