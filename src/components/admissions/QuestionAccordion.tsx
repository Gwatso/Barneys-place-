"use client";

import { useState } from "react";
import { PlusIcon } from "@/components/icons";
import type { Question } from "@/content/types";

/** One-open-at-a-time accordion. Unconfirmed answers say so plainly. */
export function QuestionAccordion({ questions }: { questions: readonly Question[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="accordion">
      {questions.map((q, index) => {
        const isOpen = open === index;
        const panelId = `question-panel-${index}`;
        const buttonId = `question-button-${index}`;
        return (
          <div key={q.question} className={`accordion__item accent-${q.accent}`} data-open={isOpen}>
            <h3 className="accordion__heading">
              <button
                id={buttonId}
                type="button"
                className="accordion__trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : index)}
              >
                <span className="accordion__label">
                  <span className="accordion__dot" aria-hidden="true" />
                  {q.question}
                </span>
                <span className="accordion__icon" aria-hidden="true">
                  <PlusIcon size={20} />
                </span>
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!isOpen} className={isOpen ? "accordion__panel" : undefined}>
              {isOpen && (
                <>
                  {q.confirmedAnswer ? (
                    <p>{q.confirmedAnswer}</p>
                  ) : (
                    <>
                      <p className="muted">
                        <strong>Why it matters:</strong> {q.whyItMatters}
                      </p>
                      <p className="awaiting">Please ask the school — this answer has not been published yet.</p>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
