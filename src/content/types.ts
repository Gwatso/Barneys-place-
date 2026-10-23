/**
 * Content status
 *
 * - "verified":  supplied and confirmed by the owners (name, address, phones,
 *                registration statement). Always published.
 * - "proposed":  sample copy written for the owner preview. Shown only while
 *                demo mode is on, and marked with a "Proposed" tag.
 * - "approved":  proposed copy the owners have signed off. Always published.
 *
 * To approve a block, change its `status` from "proposed" to "approved".
 */
export type ContentStatus = "verified" | "proposed" | "approved";

export interface Governed {
  status: ContentStatus;
}

export interface Phone {
  /** Familiar local format shown on screen, e.g. "0773 690 316". */
  display: string;
  /** International E.164 format used in tel: links, e.g. "+263773690316". */
  e164: string;
}

export interface Address {
  stand: string;
  suburb: string;
  town: string;
  country: string;
  countryCode: string;
}

/** Optional channels. Leave undefined until the owners supply them. */
export interface OptionalChannels {
  email?: string;
  whatsapp?: string;
  facebook?: string;
  instagram?: string;
}

export type Accent = "berry" | "magenta" | "leaf" | "sun" | "teal" | "charcoal";

export type LearningIconName = "story" | "numbers" | "art" | "play" | "friends" | "nature";

export interface LearningArea extends Governed {
  id: string;
  title: string;
  shortTitle: string;
  icon: LearningIconName;
  accent: Accent;
  summary: string;
  example: string;
  description: string;
  youMightSee: string[];
  howItHelps: string;
}

export interface DayStep extends Governed {
  title: string;
  summary: string;
  description: string;
  askAtHome: string;
}

export type ValueIconName = "care" | "curiosity" | "creativity" | "confidence" | "respect" | "community";

export interface SchoolValue extends Governed {
  name: string;
  icon: ValueIconName;
  accent: Accent;
  meaning: string;
  inPractice: string;
}

export interface TextBlock extends Governed {
  eyebrow?: string;
  heading: string;
  body: string[];
}

export interface Pillar {
  title: string;
  body: string;
}

export interface Question {
  question: string;
  whyItMatters: string;
  /** Leave undefined until the owners supply a confirmed answer. */
  confirmedAnswer?: string;
  accent: Accent;
}

export type GalleryCategory = "learning" | "creative" | "play" | "environment";

export type IllustrationName = LearningIconName | "pip";

export type GalleryItem = Governed & {
  id: string;
  title: string;
  category: GalleryCategory;
  caption: string;
  /** Grid shape on larger screens. */
  shape?: "tall" | "wide";
} & (
    | { kind: "illustration"; illustration: IllustrationName; background: string }
    | { kind: "placeholder"; suggestion: string }
    | {
        kind: "photo";
        /** Path under /public, e.g. "/gallery/story-time.jpg". */
        src: string;
        width: number;
        height: number;
        /** Describe what is in the photo for screen-reader users. */
        alt: string;
        /** Confirm written consent from parents/guardians for any child shown. */
        consentConfirmed: boolean;
      }
  );

export interface PageMeta {
  path: string;
  label: string;
  title: string;
  description: string;
}
