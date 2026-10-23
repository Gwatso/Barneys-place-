import { enquiryTopics, type EnquiryTopic } from "@/content/school";
import type { EnquiryDelivery } from "@/config/site";

export interface EnquiryInput {
  name: string;
  phone: string;
  topic: string;
  message: string;
}

export interface CleanEnquiry {
  name: string;
  phone: string;
  topic: EnquiryTopic;
  message: string;
}

export type EnquiryField = keyof EnquiryInput;
export type EnquiryErrors = Partial<Record<EnquiryField, string>>;

export const LIMITS = { nameMin: 2, nameMax: 80, phoneMinDigits: 9, phoneMaxDigits: 13, messageMax: 500 } as const;

// Control characters (except tab/newline) and angle brackets are stripped so
// nothing markup-like ever reaches a recipient's inbox or a backend.
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

export function sanitiseText(value: string, maxLength: number, multiline = false): string {
  let text = value.replace(CONTROL_CHARS, "").replace(/[<>]/g, "");
  text = multiline ? text.replace(/\r\n?/g, "\n").replace(/\n{3,}/g, "\n\n") : text.replace(/\s+/g, " ");
  return text.trim().slice(0, maxLength);
}

/**
 * Shared validation. It runs in the browser for instant feedback and is
 * written without browser APIs so that a future backend can import it and
 * re-validate every submission server-side.
 */
export function validateEnquiry(input: EnquiryInput): EnquiryErrors {
  const errors: EnquiryErrors = {};
  const name = sanitiseText(input.name, LIMITS.nameMax);
  if (name.length < LIMITS.nameMin) errors.name = "Please tell us your name so we know who to ask for.";

  const phone = input.phone.trim();
  const digits = phone.replace(/\D/g, "");
  if (!phone) {
    errors.phone = "Please add a number we can call you on.";
  } else if (!/^[+0-9 ()-]+$/.test(phone) || digits.length < LIMITS.phoneMinDigits || digits.length > LIMITS.phoneMaxDigits) {
    errors.phone = "That number doesn’t look quite right. Try a format like 077 123 4567.";
  }

  if (!(enquiryTopics as readonly string[]).includes(input.topic)) {
    errors.topic = "Please choose what you’d like to ask about.";
  }

  if (input.message.length > LIMITS.messageMax) {
    errors.message = `Please keep your message under ${LIMITS.messageMax} characters.`;
  }
  return errors;
}

export function cleanEnquiry(input: EnquiryInput): CleanEnquiry {
  return {
    name: sanitiseText(input.name, LIMITS.nameMax),
    phone: sanitiseText(input.phone, 24),
    topic: input.topic as EnquiryTopic,
    message: sanitiseText(input.message, LIMITS.messageMax, true),
  };
}

export type SubmitResult =
  | { ok: true; delivered: false; demo: true }
  | { ok: true; delivered: true; demo: false }
  | { ok: false; reason: "invalid" | "unavailable" | "network" | "rejected" };

/**
 * Submit an enquiry using the configured delivery method.
 * - demo:     nothing leaves the browser; nothing is stored or logged.
 * - endpoint: JSON POST; reported as delivered only on a 2xx response.
 * - none:     refuses, so the UI can direct the parent to call instead.
 */
export async function submitEnquiry(
  input: EnquiryInput,
  delivery: EnquiryDelivery,
  fetchImpl: typeof fetch = fetch,
): Promise<SubmitResult> {
  if (Object.keys(validateEnquiry(input)).length > 0) return { ok: false, reason: "invalid" };
  const enquiry = cleanEnquiry(input);

  if (delivery.kind === "demo") {
    await new Promise((resolve) => setTimeout(resolve, 900));
    return { ok: true, delivered: false, demo: true };
  }
  if (delivery.kind === "none") return { ok: false, reason: "unavailable" };

  try {
    const response = await fetchImpl(delivery.url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ ...enquiry, source: "website-admissions-form" }),
    });
    return response.ok ? { ok: true, delivered: true, demo: false } : { ok: false, reason: "rejected" };
  } catch {
    return { ok: false, reason: "network" };
  }
}
