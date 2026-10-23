"use client";

import { useState } from "react";
import { SproutIcon } from "@/components/icons";
import { LearningArt } from "@/components/illustrations/learning";
import type { LearningArea } from "@/content/types";

/** List of learning areas (a swipeable chip row on small screens) controlling one detail panel. */
export function AreaSelector({ areas }: { areas: LearningArea[] }) {
  const [active, setActive] = useState(0);
  const area = areas[active];

  return (
    <div className="areas">
      <ul className="area-list" aria-label="Learning areas">
        {areas.map((a, index) => (
          <li key={a.id}>
            <button
              type="button"
              className={`area-tab accent-${a.accent}`}
              aria-pressed={active === index}
              aria-controls="area-panel"
              onClick={() => setActive(index)}
            >
              <span className="area-tab__num" aria-hidden="true">
                {index + 1}
              </span>
              {a.title}
            </button>
          </li>
        ))}
      </ul>

      <article id="area-panel" key={area.id} className={`area-panel accent-${area.accent}`} aria-live="polite" aria-labelledby="area-title">
        <div className="area-panel__art">
          <LearningArt name={area.icon} />
        </div>
        <div>
          <p className="area-panel__step">
            AREA {active + 1} OF {areas.length}
          </p>
          <h3 id="area-title">{area.title}</h3>
          <p className="lead" style={{ marginTop: 10 }}>
            {area.description}
          </p>
          <h4>What you might see</h4>
          <ul className="see-list">
            {area.youMightSee.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="helps">
            <SproutIcon size={26} color="var(--leaf-deep)" />
            <p>
              <strong>How it helps:</strong> {area.howItHelps}
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
