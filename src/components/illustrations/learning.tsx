import type { LearningIconName, ValueIconName } from "@/content/types";
import { PipGroup } from "./brand";

const INK = "#29313B";

/** Original illustrations for the six learning areas (viewBox 120×100). */
export function LearningArt({ name, className, dark = false }: { name: LearningIconName | "pip"; className?: string; dark?: boolean }) {
  if (name === "pip") {
    return (
      <svg viewBox="-8 -16 136 156" className={className} aria-hidden="true" focusable="false">
        <PipGroup animated={false} />
      </svg>
    );
  }
  const line = dark ? "#FFFFFF" : INK;
  return (
    <svg viewBox="0 0 120 100" className={className} aria-hidden="true" focusable="false">
      {name === "story" && (
        <>
          <path d="M14 30 C30 24 46 26 60 36 L60 86 C46 76 30 74 14 80Z" fill="#fff" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
          <path d="M106 30 C90 24 74 26 60 36 L60 86 C74 76 90 74 106 80Z" fill="#FFF9EF" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
          <path d="M24 46 C32 44 40 45 50 50 M24 56 C32 54 40 55 50 60 M24 66 C32 64 40 65 50 70" stroke="#C62D3A" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M70 52 L96 48 M70 62 L96 58" stroke={INK} strokeWidth="3" strokeLinecap="round" opacity=".3" />
          <rect x="66" y="4" width="46" height="30" rx="12" fill="#F4C542" stroke={INK} strokeWidth="3" />
          <path d="M76 33 L72 44 L86 33" fill="#F4C542" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
          <text x="89" y="25" textAnchor="middle" className="svg-display" fontSize="16" fill={INK}>Aa</text>
        </>
      )}
      {name === "numbers" && (
        <>
          <rect x="35" y="12" width="34" height="34" rx="6" fill="#F4C542" stroke={INK} strokeWidth="3" />
          <text x="52" y="37" textAnchor="middle" className="svg-display" fontSize="20" fill={INK}>3</text>
          <rect x="16" y="50" width="34" height="34" rx="6" fill="#C62D3A" stroke={INK} strokeWidth="3" />
          <text x="33" y="75" textAnchor="middle" className="svg-display" fontSize="20" fill="#fff">1</text>
          <rect x="54" y="50" width="34" height="34" rx="6" fill="#1E7F47" stroke={INK} strokeWidth="3" />
          <text x="71" y="75" textAnchor="middle" className="svg-display" fontSize="20" fill="#fff">2</text>
          <circle cx="102" cy="30" r="8" fill="#BD2878" stroke={INK} strokeWidth="3" />
          <circle cx="102" cy="52" r="8" fill="#F4C542" stroke={INK} strokeWidth="3" />
          <circle cx="102" cy="74" r="8" fill="#269D58" stroke={INK} strokeWidth="3" />
        </>
      )}
      {name === "art" && (
        <>
          <path d="M60 12 C88 12 108 30 108 52 C108 68 96 72 86 68 C76 64 70 70 72 78 C74 86 66 90 56 88 C30 84 12 68 12 48 C12 26 34 12 60 12Z" fill="#fff" stroke={INK} strokeWidth="3" />
          <circle cx="38" cy="38" r="7" fill="#C62D3A" />
          <circle cx="58" cy="28" r="7" fill="#F4C542" />
          <circle cx="80" cy="34" r="7" fill="#269D58" />
          <circle cx="34" cy="60" r="7" fill="#BD2878" />
          <path d="M72 58 L106 92" stroke={INK} strokeWidth="6" strokeLinecap="round" />
          <path d="M66 50 C60 54 60 62 68 64 C74 64 76 58 72 54Z" fill="#2A6FB0" stroke={INK} strokeWidth="3" />
        </>
      )}
      {name === "play" && (
        <>
          <path d="M12 38 L26 38 M6 54 L24 54 M12 70 L26 70" stroke={line} strokeWidth="3.5" strokeLinecap="round" />
          <ellipse cx="66" cy="94" rx="22" ry="4" fill={INK} opacity=".15" />
          <circle cx="66" cy="56" r="28" fill="#F4C542" stroke={INK} strokeWidth="3" />
          <path d="M38 56 C52 48 80 48 94 56" stroke="#C62D3A" strokeWidth="5" fill="none" />
          <path d="M66 28 C58 42 58 70 66 84" stroke="#1E7F47" strokeWidth="5" fill="none" />
        </>
      )}
      {name === "friends" && (
        <>
          <path d="M60 22 C56 14 46 16 48 24 C50 30 60 34 60 34 C60 34 70 30 72 24 C74 16 64 14 60 22Z" fill="#C62D3A" stroke={line} strokeWidth="2.5" />
          <circle cx="38" cy="46" r="12" fill="#BD2878" stroke={line} strokeWidth="3" />
          <path d="M18 94 C18 72 26 62 38 62 C50 62 58 72 58 94Z" fill="#BD2878" stroke={line} strokeWidth="3" />
          <circle cx="82" cy="46" r="12" fill="#269D58" stroke={line} strokeWidth="3" />
          <path d="M62 94 C62 72 70 62 82 62 C94 62 102 72 102 94Z" fill="#269D58" stroke={line} strokeWidth="3" />
          <path d="M52 78 Q60 70 68 78" fill="none" stroke="#F4C542" strokeWidth="5" strokeLinecap="round" />
        </>
      )}
      {name === "nature" && (
        <>
          <rect x="26" y="56" width="48" height="10" rx="4" fill="#C62D3A" stroke={INK} strokeWidth="3" />
          <path d="M30 66 L70 66 L64 94 L36 94Z" fill="#C62D3A" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
          <path d="M50 56 L50 30" stroke={INK} strokeWidth="3" strokeLinecap="round" />
          <path d="M50 40 C38 28 26 32 24 38 C34 46 44 46 50 40Z" fill="#269D58" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
          <path d="M50 34 C60 20 74 22 78 28 C70 38 58 40 50 34Z" fill="#3DBA6E" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
          <circle cx="92" cy="54" r="14" fill="#E8F3FB" stroke={INK} strokeWidth="3" />
          <path d="M102 64 L114 78" stroke={INK} strokeWidth="6" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

/** Original illustrations for the six proposed values (viewBox 96×80). */
export function ValueArt({ name, className }: { name: ValueIconName; className?: string }) {
  return (
    <svg viewBox="0 0 96 80" width="96" height="80" className={className} aria-hidden="true" focusable="false">
      {name === "care" && (
        <>
          <path d="M48 30 C44 20 30 20 30 32 C30 42 48 52 48 52 C48 52 66 42 66 32 C66 20 52 20 48 30Z" fill="#C62D3A" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
          <path d="M8 50 C18 50 26 56 32 62 L56 62 C60 62 60 56 56 56 L40 56" fill="none" stroke={INK} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M88 50 C78 50 70 56 64 62 L56 62" fill="none" stroke={INK} strokeWidth="3.5" strokeLinecap="round" />
          <path d="M8 50 L8 72 M88 50 L88 72" stroke={INK} strokeWidth="3.5" strokeLinecap="round" />
        </>
      )}
      {name === "curiosity" && (
        <>
          <circle cx="40" cy="34" r="24" fill="#fff" stroke={INK} strokeWidth="3.5" />
          <path d="M57 51 L80 74" stroke={INK} strokeWidth="8" strokeLinecap="round" />
          <path d="M33 28 C33 20 47 20 47 28 C47 34 40 34 40 40" fill="none" stroke="#C62D3A" strokeWidth="4" strokeLinecap="round" />
          <circle cx="40" cy="47" r="2.6" fill="#C62D3A" />
        </>
      )}
      {name === "creativity" && (
        <>
          <path d="M10 60 C24 40 40 64 56 46 C66 36 76 44 86 34" fill="none" stroke="#BD2878" strokeWidth="10" strokeLinecap="round" />
          <path d="M70 6 L74 16 L85 17 L77 24 L79 35 L70 29 L61 35 L63 24 L55 17 L66 16Z" fill="#F4C542" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
          <circle cx="20" cy="22" r="6" fill="#269D58" />
          <circle cx="38" cy="14" r="4" fill="#C62D3A" />
        </>
      )}
      {name === "confidence" && (
        <>
          <path d="M6 74 L36 30 L52 50 L64 36 L90 74Z" fill="#269D58" stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
          <path d="M36 30 L36 6" stroke={INK} strokeWidth="3.5" strokeLinecap="round" />
          <path d="M36 6 L58 12 L36 20Z" fill="#C62D3A" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
          <circle cx="78" cy="16" r="8" fill="#F4C542" />
        </>
      )}
      {name === "respect" && (
        <>
          <rect x="6" y="8" width="50" height="32" rx="14" fill="#13807A" stroke={INK} strokeWidth="3" />
          <path d="M18 40 L14 52 L30 40" fill="#13807A" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
          <rect x="40" y="38" width="50" height="32" rx="14" fill="#fff" stroke={INK} strokeWidth="3" />
          <path d="M78 70 L82 80 L68 70" fill="#fff" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
          <circle cx="22" cy="24" r="3" fill="#fff" />
          <circle cx="31" cy="24" r="3" fill="#fff" />
          <circle cx="40" cy="24" r="3" fill="#fff" />
          <path d="M56 54 L74 54" stroke={INK} strokeWidth="3" strokeLinecap="round" />
        </>
      )}
      {name === "community" && (
        <>
          <circle cx="20" cy="30" r="10" fill="#C62D3A" stroke={INK} strokeWidth="3" />
          <circle cx="48" cy="24" r="10" fill="#F4C542" stroke={INK} strokeWidth="3" />
          <circle cx="76" cy="30" r="10" fill="#269D58" stroke={INK} strokeWidth="3" />
          <path d="M6 74 C6 54 12 44 20 44 C28 44 34 54 34 74Z" fill="#C62D3A" stroke={INK} strokeWidth="3" />
          <path d="M34 74 C34 50 40 38 48 38 C56 38 62 50 62 74Z" fill="#F4C542" stroke={INK} strokeWidth="3" />
          <path d="M62 74 C62 54 68 44 76 44 C84 44 90 54 90 74Z" fill="#269D58" stroke={INK} strokeWidth="3" />
        </>
      )}
    </svg>
  );
}

/** Seed → sprout → bloom, for the three philosophy pillars (viewBox 120×96). */
export function PhilosophyArt({ stage }: { stage: 0 | 1 | 2 }) {
  return (
    <svg viewBox="0 0 120 96" width="120" height="96" aria-hidden="true" focusable="false">
      {stage === 0 && (
        <>
          <path d="M8 84 C40 76 80 76 112 84" fill="none" stroke="#269D58" strokeWidth="5" strokeLinecap="round" />
          <ellipse cx="60" cy="70" rx="16" ry="12" fill="#F4C542" stroke={INK} strokeWidth="3.5" />
          <path d="M60 58 C60 52 62 48 66 46" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />
          <path d="M52 24 C52 16 63 13 66 22 C69 13 80 16 80 24 C80 33 66 40 66 40 C66 40 52 33 52 24Z" fill="#C62D3A" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        </>
      )}
      {stage === 1 && (
        <>
          <path d="M10 86 L110 86" stroke="#BFE5C9" strokeWidth="5" strokeLinecap="round" />
          <path d="M60 86 L60 42" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
          <path d="M60 58 C44 40 26 44 22 54 C34 66 50 66 60 58Z" fill="#3DBA6E" stroke="#fff" strokeWidth="3.5" strokeLinejoin="round" />
          <path d="M60 46 C74 24 94 26 100 36 C90 50 72 54 60 46Z" fill="#F4C542" stroke="#fff" strokeWidth="3.5" strokeLinejoin="round" />
          <circle cx="96" cy="14" r="7" fill="#F4C542" />
        </>
      )}
      {stage === 2 && (
        <>
          <path d="M60 92 L60 40" stroke={INK} strokeWidth="4" strokeLinecap="round" />
          <path d="M60 70 C46 58 32 62 30 70 C40 78 52 78 60 70Z" fill="#269D58" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
          <g transform="translate(60 30)">
            <circle cx="0" cy="-16" r="11" fill="#BD2878" stroke={INK} strokeWidth="3" />
            <circle cx="15" cy="-5" r="11" fill="#C62D3A" stroke={INK} strokeWidth="3" />
            <circle cx="9" cy="13" r="11" fill="#BD2878" stroke={INK} strokeWidth="3" />
            <circle cx="-9" cy="13" r="11" fill="#C62D3A" stroke={INK} strokeWidth="3" />
            <circle cx="-15" cy="-5" r="11" fill="#BD2878" stroke={INK} strokeWidth="3" />
            <circle r="10" fill="#F4C542" stroke={INK} strokeWidth="3" />
          </g>
        </>
      )}
    </svg>
  );
}
