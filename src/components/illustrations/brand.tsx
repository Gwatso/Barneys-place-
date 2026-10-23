/**
 * Proposed brand artwork (original, pending owner approval):
 * - LogoMark: an open book under a roof line with a seedling growing from the spine.
 * - Pip: a curious seedling mascot. Not based on any television character.
 */

const INK = "#29313B";

export function LogoMark({ size = 52, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" aria-hidden="true" focusable="false" className={className}>
      <path d="M9 24 L28 10 L47 24" fill="none" stroke="#C62D3A" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 28 C17 26 23 27 28 31 L28 47 C23 43 17 42 11 44Z" fill="#BD2878" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M45 28 C39 26 33 27 28 31 L28 47 C33 43 39 42 45 44Z" fill="#269D58" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M28 31 L28 21" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M28 24 C24 19 20 19 18 21 C21 25 25 26 28 24Z" fill="#F4C542" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      <path d="M28 22 C31 16 36 16 38 18 C35 23 31 24 28 22Z" fill="#F4C542" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

interface PipBodyProps {
  /** Body colour: sunshine (default) or cream. */
  tone?: "sun" | "cream";
  waving?: boolean;
  /** Arms down at the sides (used when Pip holds a book). */
  armless?: boolean;
  animated?: boolean;
}

/** Pip's artwork as an SVG group, drawn in a 120×130 box (leaves rise to y≈-14). */
export function PipGroup({ tone = "sun", waving = true, armless = false, animated = true }: PipBodyProps) {
  const body = tone === "sun" ? "#F4C542" : "#FFF9EF";
  return (
    <g className={animated ? "anim-bob" : undefined}>
      <path d="M60 22 L60 8" stroke={INK} strokeWidth="4" strokeLinecap="round" />
      <path d="M60 12 C46 -4 24 -2 16 8 C30 20 48 22 60 12Z" fill="#269D58" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
      <path d="M60 8 C72 -12 96 -12 106 -2 C94 14 74 18 60 8Z" fill="#3DBA6E" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
      {!armless && (
        <>
          <path d="M14 84 C4 86 -4 80 -4 72" fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" />
          {waving ? (
            <path
              className={animated ? "anim-wave" : undefined}
              d="M106 80 C118 74 124 62 120 50"
              fill="none"
              stroke={INK}
              strokeWidth="5"
              strokeLinecap="round"
            />
          ) : (
            <path d="M106 84 C116 86 122 78 122 70" fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" />
          )}
        </>
      )}
      <ellipse cx="44" cy="126" rx="13" ry="7" fill="#C62D3A" stroke={INK} strokeWidth="3.5" />
      <ellipse cx="76" cy="126" rx="13" ry="7" fill="#C62D3A" stroke={INK} strokeWidth="3.5" />
      <path d="M60 22 C92 22 108 50 108 78 C108 106 88 122 60 122 C32 122 12 106 12 78 C12 50 28 22 60 22Z" fill={body} stroke={INK} strokeWidth="4" strokeLinejoin="round" />
      <ellipse cx="45" cy="70" rx="6" ry="8" fill={INK} />
      <circle cx="47" cy="66" r="2.2" fill="#fff" />
      <ellipse cx="75" cy="70" rx="6" ry="8" fill={INK} />
      <circle cx="77" cy="66" r="2.2" fill="#fff" />
      <circle cx="32" cy="88" r="7" fill="#BD2878" opacity=".35" />
      <circle cx="88" cy="88" r="7" fill="#BD2878" opacity=".35" />
      <path d="M49 90 Q60 102 71 90" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" />
    </g>
  );
}

/** Standalone Pip. Pass a `label` to expose Pip to screen readers; otherwise decorative. */
export function Pip({ label, className, ...props }: PipBodyProps & { label?: string; className?: string }) {
  return (
    <svg
      viewBox="-8 -16 136 156"
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      <PipGroup {...props} />
    </svg>
  );
}
