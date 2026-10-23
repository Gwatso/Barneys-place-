import type { ReactNode, SVGProps } from "react";

/** Stroke icons drawn for this site. Decorative by default (aria-hidden). */
type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & { size?: number };

function Svg({ size = 20, strokeWidth = 2.4, children, ...rest }: IconProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const PhoneIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
  </Svg>
);
export const ArrowRightIcon = (p: IconProps) => (
  <Svg strokeWidth={2.6} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Svg>
);
export const ArrowLeftIcon = (p: IconProps) => (
  <Svg strokeWidth={2.6} {...p}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </Svg>
);
export const ChevronLeftIcon = (p: IconProps) => (
  <Svg strokeWidth={2.6} {...p}>
    <path d="M15 6l-6 6 6 6" />
  </Svg>
);
export const ChevronRightIcon = (p: IconProps) => (
  <Svg strokeWidth={2.6} {...p}>
    <path d="M9 6l6 6-6 6" />
  </Svg>
);
export const ChevronDownIcon = (p: IconProps) => (
  <Svg strokeWidth={2.6} {...p}>
    <path d="M6 9l6 6 6-6" />
  </Svg>
);
export const ExternalIcon = (p: IconProps) => (
  <Svg strokeWidth={2.6} {...p}>
    <path d="M7 17L17 7M9 7h8v8" />
  </Svg>
);
export const CloseIcon = (p: IconProps) => (
  <Svg strokeWidth={2.6} {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Svg>
);
export const MenuIcon = (p: IconProps) => (
  <Svg strokeWidth={2.6} {...p}>
    <path d="M4 7h16M4 12h16M4 17h10" />
  </Svg>
);
export const PlusIcon = (p: IconProps) => (
  <Svg strokeWidth={2.6} {...p}>
    <path d="M12 5v14M5 12h14" />
  </Svg>
);
export const ShieldIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 2l8 4v6c0 5-3.4 8.6-8 10-4.6-1.4-8-5-8-10V6z" />
    <path d="M8.5 12l2.5 2.5L16 9.5" />
  </Svg>
);
export const HomeIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 11l9-7 9 7" />
    <path d="M5 10v10h14V10" />
    <path d="M10 20v-6h4v6" />
  </Svg>
);
export const PinIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 22s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12z" />
    <circle cx="12" cy="10" r="2.5" />
  </Svg>
);
export const CopyIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="9" y="9" width="12" height="12" rx="2" />
    <path d="M5 15V5a2 2 0 0 1 2-2h10" />
  </Svg>
);
export const CheckIcon = (p: IconProps) => (
  <Svg strokeWidth={2.8} {...p}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </Svg>
);
export const AlertIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 7v6M12 16.5v.5" />
  </Svg>
);
export const ChatIcon = (p: IconProps) => (
  <Svg strokeWidth={1.8} {...p}>
    <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />
    <path d="M9 11h.01M12.5 11h.01M16 11h.01" />
  </Svg>
);
export const ChecklistIcon = (p: IconProps) => (
  <Svg strokeWidth={1.8} {...p}>
    <rect x="4" y="3" width="16" height="18" rx="3" />
    <path d="M8 9l2 2 4-4M8 15h8" />
  </Svg>
);
export const CameraIcon = (p: IconProps) => (
  <Svg strokeWidth={1.8} {...p}>
    <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
    <circle cx="12" cy="13" r="3.5" />
  </Svg>
);
export const PencilIcon = (p: IconProps) => (
  <Svg strokeWidth={2.2} {...p}>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />
  </Svg>
);
export const SproutIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 22V12" />
    <path d="M12 14C8 14 5 11 5 7c4 0 7 3 7 7z" />
    <path d="M12 12c0-4 3-7 7-7 0 4-3 7-7 7z" />
  </Svg>
);
