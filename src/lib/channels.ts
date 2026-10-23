import type { OptionalChannels } from "@/content/types";

export interface Channel {
  label: string;
  text: string;
  href: string;
  external: boolean;
}

/** Turns confirmed optional channels into safe links. Unset or invalid values are skipped. */
export function contactChannels(channels: OptionalChannels): Channel[] {
  const result: Channel[] = [];
  if (channels.email && /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(channels.email)) {
    result.push({ label: "Email", text: channels.email, href: `mailto:${channels.email}`, external: false });
  }
  const whatsappDigits = channels.whatsapp?.replace(/\D/g, "");
  if (whatsappDigits && whatsappDigits.length >= 9) {
    result.push({ label: "WhatsApp", text: channels.whatsapp!, href: `https://wa.me/${whatsappDigits}`, external: true });
  }
  for (const [key, label] of [["facebook", "Facebook"], ["instagram", "Instagram"]] as const) {
    const value = channels[key];
    if (value && /^https:\/\//.test(value)) result.push({ label, text: value.replace(/^https:\/\/(www\.)?/, ""), href: value, external: true });
  }
  return result;
}
