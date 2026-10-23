import type { Phone } from "@/content/types";

export function telHref(phone: Phone): string {
  return `tel:${phone.e164}`;
}

/** Digits only, e.g. for copying to the clipboard: "0773690316". */
export function localDigits(phone: Phone): string {
  return phone.display.replace(/\D/g, "");
}
