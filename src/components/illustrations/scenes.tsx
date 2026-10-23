import { site } from "@/config/site";
import { PipGroup } from "./brand";

const INK = "#29313B";

/** Home hero: Pip waving from a giant storybook on a green hill. */
export function HeroScene() {
  return (
    <svg
      viewBox="0 0 760 540"
      role="img"
      aria-label="Illustration: a friendly seedling character waves from the top of a giant open storybook, surrounded by letter blocks, a smiling sun, a puzzle piece and a potted plant on a green hill."
      focusable="false"
    >
      <circle cx="390" cy="300" r="232" fill="#FCE9C0" />
      <path d="M226 76 C226 60 244 52 258 58 C264 44 288 42 296 58 C312 54 324 66 318 80 Z" fill="#fff" stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
      <g transform="translate(610 104)">
        <g className="anim-spin">
          <circle cx="80" cy="0" r="9" fill="#C62D3A" />
          <circle cx="56.6" cy="56.6" r="9" fill="#BD2878" />
          <circle cx="0" cy="80" r="9" fill="#269D58" />
          <circle cx="-56.6" cy="56.6" r="9" fill="#C62D3A" />
          <circle cx="-80" cy="0" r="9" fill="#BD2878" />
          <circle cx="-56.6" cy="-56.6" r="9" fill="#269D58" />
          <circle cx="0" cy="-80" r="9" fill="#C62D3A" />
          <circle cx="56.6" cy="-56.6" r="9" fill="#BD2878" />
        </g>
        <circle r="54" fill="#F4C542" stroke={INK} strokeWidth="4" />
        <ellipse cx="-17" cy="-6" rx="5" ry="7" fill={INK} />
        <ellipse cx="17" cy="-6" rx="5" ry="7" fill={INK} />
        <circle cx="-30" cy="12" r="7" fill="#E07A3F" opacity=".45" />
        <circle cx="30" cy="12" r="7" fill="#E07A3F" opacity=".45" />
        <path d="M-14 14 Q0 28 14 14" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" />
      </g>
      <g transform="translate(78 108) rotate(-14)">
        <path d="M0 14 h16 a12 12 0 1 1 24 0 h16 v16 a12 12 0 1 1 0 24 v16 h-56 Z" fill="#BD2878" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
      </g>
      <path d="M0 392 C120 336 260 346 380 384 C500 422 640 352 760 372 L760 540 L0 540Z" fill="#BFE5C9" />
      <path d="M0 452 C160 414 300 442 420 460 C560 482 660 440 760 448 L760 540 L0 540Z" fill="#269D58" />
      <ellipse cx="380" cy="486" rx="250" ry="16" fill="#1A6B3C" opacity=".35" />
      <path d="M156 262 L156 470 C238 446 318 450 380 484 C442 450 522 446 604 470 L604 262 Z" fill="#C62D3A" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
      <path d="M170 250 C240 226 320 230 380 266 L380 470 C320 436 240 432 170 456Z" fill="#fff" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
      <path d="M590 250 C520 226 440 230 380 266 L380 470 C440 436 520 432 590 456Z" fill="#FFF9EF" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
      <text x="206" y="312" className="svg-display" fontSize="40" fill="#C62D3A">A</text>
      <text x="246" y="316" className="svg-display" fontSize="40" fill="#BD2878">b</text>
      <text x="284" y="322" className="svg-display" fontSize="40" fill="#1E7F47">c</text>
      <path d="M204 352 C250 342 300 346 352 364 M204 380 C250 370 300 374 352 392 M204 408 C240 400 270 402 300 410" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" opacity=".22" />
      <path d="M424 344 L462 316 L500 344" fill="none" stroke="#C62D3A" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M432 344 L432 386 L492 386 L492 344" fill="#fff" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
      <rect x="454" y="360" width="16" height="26" rx="3" fill="#F4C542" stroke={INK} strokeWidth="3" />
      <circle cx="530" cy="300" r="8" fill="#C62D3A" />
      <circle cx="552" cy="322" r="6" fill="#F4C542" />
      <circle cx="540" cy="352" r="7" fill="#269D58" />
      <circle cx="518" cy="408" r="6" fill="#BD2878" />
      {site.showMascot && (
        <g transform="translate(320 132)">
          <PipGroup />
        </g>
      )}
      <g transform="translate(34 330) rotate(-6)">
        <rect width="66" height="66" rx="10" fill="#F4C542" stroke={INK} strokeWidth="4" />
        <text x="33" y="48" textAnchor="middle" className="svg-display" fontSize="40" fill={INK}>a</text>
      </g>
      <g transform="translate(14 400)">
        <rect width="66" height="66" rx="10" fill="#C62D3A" stroke={INK} strokeWidth="4" />
        <text x="33" y="48" textAnchor="middle" className="svg-display" fontSize="40" fill="#fff">B</text>
      </g>
      <g transform="translate(84 400)">
        <rect width="66" height="66" rx="10" fill="#1E7F47" stroke={INK} strokeWidth="4" />
        <text x="33" y="48" textAnchor="middle" className="svg-display" fontSize="40" fill="#fff">P</text>
      </g>
      <path d="M662 404 L662 318" stroke={INK} strokeWidth="4" strokeLinecap="round" />
      <path d="M662 360 C640 336 616 340 610 352 C626 368 648 370 662 360Z" fill="#269D58" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
      <path d="M662 340 C680 312 708 314 716 326 C702 346 678 350 662 340Z" fill="#3DBA6E" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
      <path d="M662 322 C650 300 654 284 664 280 C676 292 674 310 662 322Z" fill="#269D58" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
      <path d="M626 410 L698 410 L688 470 L636 470Z" fill="#BD2878" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
      <rect x="618" y="398" width="88" height="16" rx="6" fill="#BD2878" stroke={INK} strokeWidth="4" />
      <g transform="translate(560 214)">
        <ellipse cx="-9" cy="-4" rx="10" ry="13" fill="#F4C542" stroke={INK} strokeWidth="3" transform="rotate(-25 -9 -4)" />
        <ellipse cx="9" cy="-4" rx="10" ry="13" fill="#BD2878" stroke={INK} strokeWidth="3" transform="rotate(25 9 -4)" />
        <path d="M0 -12 L0 10" stroke={INK} strokeWidth="4" strokeLinecap="round" />
      </g>
      <circle cx="40" cy="514" r="9" fill="#F4C542" />
      <circle cx="96" cy="504" r="11" fill="#fff" />
      <circle cx="156" cy="500" r="9" fill="#BD2878" />
      <circle cx="214" cy="502" r="11" fill="#F4C542" />
      <circle cx="274" cy="508" r="9" fill="#fff" />
    </svg>
  );
}

/** About hero: Pip reading on a stack of books under the sun. */
export function AboutScene() {
  return (
    <svg viewBox="0 0 480 420" role="img" aria-label="Illustration: a seedling character sits on a stack of books, reading a storybook under a big yellow sun." focusable="false">
      <circle cx="250" cy="200" r="180" fill="#F4C542" stroke={INK} strokeWidth="4" />
      <circle cx="60" cy="70" r="16" fill="#C62D3A" />
      <circle cx="430" cy="90" r="12" fill="#BD2878" />
      <circle cx="440" cy="330" r="18" fill="#269D58" />
      <circle cx="40" cy="300" r="10" fill="#BD2878" />
      <rect x="110" y="330" width="280" height="44" rx="10" fill="#1E7F47" stroke={INK} strokeWidth="4" />
      <rect x="130" y="290" width="240" height="42" rx="10" fill="#BD2878" stroke={INK} strokeWidth="4" />
      <rect x="150" y="252" width="200" height="40" rx="10" fill="#C62D3A" stroke={INK} strokeWidth="4" />
      <path d="M128 352 L372 352 M148 311 L352 311 M168 272 L332 272" stroke="#fff" strokeWidth="3" opacity=".5" />
      <g transform="translate(190 112)">
        <g className="anim-bob">
          <path d="M60 22 L60 8" stroke={INK} strokeWidth="4" strokeLinecap="round" />
          <path d="M60 12 C46 -4 24 -2 16 8 C30 20 48 22 60 12Z" fill="#269D58" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
          <path d="M60 8 C72 -12 96 -12 106 -2 C94 14 74 18 60 8Z" fill="#3DBA6E" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
          <ellipse cx="40" cy="134" rx="14" ry="7" fill="#C62D3A" stroke={INK} strokeWidth="3.5" />
          <ellipse cx="80" cy="134" rx="14" ry="7" fill="#C62D3A" stroke={INK} strokeWidth="3.5" />
          <path d="M60 22 C92 22 108 50 108 78 C108 106 88 122 60 122 C32 122 12 106 12 78 C12 50 28 22 60 22Z" fill="#FFF9EF" stroke={INK} strokeWidth="4" />
          <ellipse cx="45" cy="64" rx="5" ry="6" fill={INK} />
          <ellipse cx="75" cy="64" rx="5" ry="6" fill={INK} />
          <circle cx="32" cy="80" r="7" fill="#BD2878" opacity=".35" />
          <circle cx="88" cy="80" r="7" fill="#BD2878" opacity=".35" />
          <path d="M52 80 Q60 88 68 80" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" />
          <path d="M14 92 C30 84 46 86 60 96 L60 126 C46 116 30 114 14 122Z" fill="#fff" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
          <path d="M106 92 C90 84 74 86 60 96 L60 126 C74 116 90 114 106 122Z" fill="#fff" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
          <path d="M24 102 C32 98 42 99 50 104 M70 104 C78 99 88 98 96 102" stroke="#C62D3A" strokeWidth="3" strokeLinecap="round" fill="none" />
        </g>
      </g>
    </svg>
  );
}

/** Admissions hero: stepping stones through an arched gate. */
export function GateScene() {
  return (
    <svg viewBox="0 0 420 380" role="img" aria-label="Illustration: coloured stepping stones lead through an arched gate to a seedling character waving hello." focusable="false">
      <path d="M70 360 L70 150 C70 70 130 30 210 30 C290 30 350 70 350 150 L350 360" fill="#FFF9EF" stroke={INK} strokeWidth="5" />
      <path d="M70 150 C70 70 130 30 210 30 C290 30 350 70 350 150" fill="none" stroke="#C62D3A" strokeWidth="22" />
      <path d="M70 150 C70 70 130 30 210 30 C290 30 350 70 350 150" fill="none" stroke={INK} strokeWidth="5" />
      <circle cx="110" cy="80" r="7" fill="#F4C542" />
      <circle cx="160" cy="46" r="7" fill="#fff" />
      <circle cx="210" cy="38" r="7" fill="#F4C542" />
      <circle cx="260" cy="46" r="7" fill="#fff" />
      <circle cx="310" cy="80" r="7" fill="#F4C542" />
      <rect x="50" y="150" width="40" height="215" rx="12" fill="#F4C542" stroke={INK} strokeWidth="5" />
      <rect x="330" y="150" width="40" height="215" rx="12" fill="#F4C542" stroke={INK} strokeWidth="5" />
      <path d="M90 300 C150 290 270 290 330 300 L330 365 L90 365Z" fill="#BFE5C9" />
      <ellipse cx="210" cy="350" rx="40" ry="11" fill="#C62D3A" stroke={INK} strokeWidth="4" />
      <ellipse cx="190" cy="322" rx="30" ry="8" fill="#F4C542" stroke={INK} strokeWidth="4" />
      <ellipse cx="214" cy="300" rx="22" ry="6" fill="#269D58" stroke={INK} strokeWidth="4" />
      {site.showMascot && (
        <g transform="translate(160 156) scale(.86)">
          <PipGroup />
        </g>
      )}
    </svg>
  );
}

/** Learning Journey hero: a dotted path of stepping stones across the hill. */
export function PathScene() {
  return (
    <svg viewBox="0 0 1440 220" preserveAspectRatio="xMidYMax meet" aria-hidden="true" focusable="false" className="path-scene">
      <path d="M0 150 C200 110 360 170 560 140 C760 110 900 60 1100 100 C1260 132 1360 120 1440 110 L1440 220 L0 220Z" fill="#FFF9EF" />
      <path d="M120 160 C300 130 420 175 600 150 C780 125 900 85 1080 110 C1220 128 1320 118 1380 112" fill="none" stroke={INK} strokeWidth="4" strokeDasharray="2 18" strokeLinecap="round" />
      <circle cx="120" cy="160" r="16" fill="#C62D3A" stroke={INK} strokeWidth="4" />
      <circle cx="420" cy="166" r="16" fill="#BD2878" stroke={INK} strokeWidth="4" />
      <circle cx="740" cy="128" r="16" fill="#269D58" stroke={INK} strokeWidth="4" />
      <circle cx="1060" cy="106" r="16" fill="#13807A" stroke={INK} strokeWidth="4" />
      {site.showMascot && (
        <g transform="translate(1300 22) scale(.68)">
          <PipGroup tone="cream" waving={false} />
        </g>
      )}
    </svg>
  );
}

/** Decorative, not-to-scale map. Streets are invented shapes, not real roads. */
export function MapScene({ large = false }: { large?: boolean }) {
  return (
    <svg
      viewBox="0 0 640 460"
      role="img"
      aria-label="Illustrative, not-to-scale map with a pin marking Barney’s Place, Stand No. 3103, Aerodrome Medium, Bindura."
      focusable="false"
    >
      <rect width="640" height="460" rx="36" fill="#E6F5EB" />
      <rect x="40" y="40" width="170" height="130" rx="22" fill="#D2EBD9" />
      <rect x="260" y="30" width="140" height="140" rx="22" fill="#D2EBD9" />
      <rect x="450" y="50" width="150" height="110" rx="22" fill="#D2EBD9" />
      <rect x="40" y="290" width="180" height="130" rx="22" fill="#D2EBD9" />
      <rect x="450" y="290" width="150" height="130" rx="22" fill="#D2EBD9" />
      <circle cx="120" cy="100" r="22" fill="#269D58" opacity=".45" />
      <circle cx="160" cy="130" r="14" fill="#269D58" opacity=".45" />
      <circle cx="530" cy="350" r="24" fill="#269D58" opacity=".45" />
      <circle cx="90" cy="360" r="16" fill="#269D58" opacity=".45" />
      <path d="M-10 230 C170 224 300 248 650 218" fill="none" stroke="#D6CDBD" strokeWidth="40" strokeLinecap="round" />
      <path d="M-10 230 C170 224 300 248 650 218" fill="none" stroke="#fff" strokeWidth="30" strokeLinecap="round" />
      {large && <path d="M-10 230 C170 224 300 248 650 218" fill="none" stroke="#F4C542" strokeWidth="3" strokeDasharray="14 14" />}
      <path d="M235 -10 C240 140 220 300 240 470" fill="none" stroke="#D6CDBD" strokeWidth="32" />
      <path d="M235 -10 C240 140 220 300 240 470" fill="none" stroke="#fff" strokeWidth="22" />
      <path d="M425 -10 C420 140 436 340 428 470" fill="none" stroke="#D6CDBD" strokeWidth="26" />
      <path d="M425 -10 C420 140 436 340 428 470" fill="none" stroke="#fff" strokeWidth="18" />
      <text x="330" y="282" textAnchor="middle" fontWeight="800" fontSize="15" letterSpacing="2.5" fill="#5A6370">AERODROME MEDIUM</text>
      <text x="120" y="440" textAnchor="middle" fontWeight="800" fontSize="13" letterSpacing="2" fill="#5A6370">BINDURA</text>
      <g transform="translate(330 196)">
        <circle className="anim-ping" cx="0" cy="10" r="30" fill="#C62D3A" opacity=".35" />
        <ellipse cx="0" cy="12" rx="24" ry="8" fill={INK} opacity=".18" />
        <path d="M0 8 C-16 -12 -38 -30 -38 -56 C-38 -78 -20 -94 0 -94 C20 -94 38 -78 38 -56 C38 -30 16 -12 0 8Z" fill="#C62D3A" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
        <circle cx="0" cy="-56" r="20" fill="#fff" stroke={INK} strokeWidth="3" />
        <path d="M-10 -53 L0 -63 L10 -53" fill="none" stroke="#C62D3A" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M-6 -52 L-6 -46 L6 -46 L6 -52" fill="none" stroke="#269D58" strokeWidth="3" strokeLinejoin="round" />
      </g>
      <g transform="translate(372 72)">
        <rect width="214" height="54" rx="27" fill="#fff" stroke={INK} strokeWidth="3" />
        <text x="107" y="34" textAnchor="middle" className="svg-display" fontSize="19" fill={INK}>Barney’s Place · 3103</text>
      </g>
    </svg>
  );
}
