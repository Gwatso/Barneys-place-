"use client";

import { useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/icons";
import type { DayStep } from "@/content/types";

const accents = ["sun", "berry", "magenta", "leaf", "teal"];

/** Five-chapter stepper with a progress track. Previous/Next disable at the ends. */
export function DayStepper({ steps }: { steps: DayStep[] }) {
  const [active, setActive] = useState(0);
  const step = steps[active];
  const progress = steps.length > 1 ? active / (steps.length - 1) : 1;
  const accent = accents[active % accents.length];

  return (
    <>
      <div className="stepper" style={{ ["--progress" as string]: progress }}>
        <div className="stepper__track" aria-hidden="true" />
        <div className="stepper__fill" aria-hidden="true" />
        <ol className="stepper__nodes">
          {steps.map((s, index) => (
            <li key={s.title} className="stepper__node">
              <button
                type="button"
                className={`node-btn accent-${accents[index % accents.length]}`}
                data-done={index <= active}
                aria-current={index === active ? "step" : undefined}
                aria-label={`Chapter ${index + 1}: ${s.title}`}
                onClick={() => setActive(index)}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div className={`panel chapter accent-${accent}`} aria-live="polite">
        <div className="chapter__num" aria-hidden="true">
          {active + 1}
        </div>
        <div key={step.title} className="reveal">
          <p className="chapter__label">
            CHAPTER {active + 1} OF {steps.length}
          </p>
          <h3>{step.title}</h3>
          <p>{step.description}</p>
          <p className="ask-home">
            <span>Ask at home:</span> “{step.askAtHome}”
          </p>
        </div>
      </div>

      <div className="stepper-actions">
        <button type="button" className="btn btn--secondary" onClick={() => setActive(active - 1)} disabled={active === 0}>
          <ArrowLeftIcon />
          Previous
        </button>
        <button type="button" className="btn btn--green" onClick={() => setActive(active + 1)} disabled={active === steps.length - 1}>
          Next chapter
          <ArrowRightIcon />
        </button>
      </div>
    </>
  );
}
