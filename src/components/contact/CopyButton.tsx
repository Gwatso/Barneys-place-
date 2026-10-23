"use client";

import { useEffect, useRef, useState } from "react";
import { CheckIcon, CopyIcon } from "@/components/icons";

type State = "idle" | "copied" | "failed";

/** Copies text to the clipboard with visible and announced feedback. */
export function CopyButton({ text, label }: { text: string; label: string }) {
  const [state, setState] = useState<State>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    let ok = false;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        ok = true;
      }
    } catch {
      ok = false;
    }
    setState(ok ? "copied" : "failed");
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2600);
  }

  return (
    <span style={{ display: "inline-flex", flexWrap: "wrap", alignItems: "center", gap: 10 }}>
      <button type="button" className="copy-btn" onClick={copy}>
        {state === "copied" ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
        {state === "copied" ? "Copied!" : state === "failed" ? "Couldn’t copy" : label}
      </button>
      <span role="status" className={state === "failed" ? "field__msg field__msg--error" : "visually-hidden"} style={{ marginTop: 0 }}>
        {state === "copied" ? `${text} copied to your clipboard.` : state === "failed" ? "Copying is blocked here — please note it down." : ""}
      </span>
    </span>
  );
}
