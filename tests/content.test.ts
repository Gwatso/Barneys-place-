import { describe, expect, it } from "vitest";
import * as content from "@/content/school";
import { directionsUrl, school } from "@/content/school";

const allText = JSON.stringify(content);

describe("verified school details", () => {
  it("uses the owner-supplied address and numbers", () => {
    expect(school.address).toMatchObject({ stand: "Stand No. 3103", suburb: "Aerodrome Medium", town: "Bindura", country: "Zimbabwe" });
    expect(school.phones.map((p) => p.e164)).toEqual(["+263773690316", "+263776631541"]);
    expect(school.phones.map((p) => p.display.replace(/\s/g, ""))).toEqual(["0773690316", "0776631541"]);
    expect(school.registration.statement).toBe("Registered with the Ministry of Primary and Secondary Education, Zimbabwe.");
  });

  it("builds the directions link from the address, not coordinates", () => {
    const url = new URL(directionsUrl);
    expect(url.hostname).toBe("www.google.com");
    expect(url.searchParams.get("query")).toContain("Stand No. 3103, Aerodrome Medium, Bindura, Zimbabwe");
  });
});

describe("no unapproved operational details", () => {
  it("contains no email address, social account or WhatsApp link", () => {
    expect(allText).not.toMatch(/[\w.+-]+@[\w-]+\.[\w.]+/);
    expect(allText).not.toMatch(/wa\.me|facebook\.com|instagram\.com/i);
    expect(Object.values(school.channels).filter(Boolean)).toHaveLength(0);
  });

  it("contains no fees, times, ages, registration numbers or statistics", () => {
    expect(allText).not.toMatch(/\$\s?\d|USD|ZWL|ZiG\s?\d/);
    expect(allText).not.toMatch(/\b\d{1,2}(:\d{2})?\s?(am|pm)\b/i);
    expect(allText).not.toMatch(/\b\d+\s*(years?|months?)\s*(old)?\b/i);
    expect(allText).not.toMatch(/registration (no|number)|reg\.?\s*no/i);
    // Percent figures (but not URL-encoding such as %20 in the directions link).
    expect(allText).not.toMatch(/\b\d+\s?%(?![0-9A-F]{2})/);
    expect(allText).not.toMatch(/founded|established in|since \d{4}/i);
  });

  it("keeps every proposed block marked as proposed until approved", () => {
    for (const area of content.learningAreas) expect(area.status).toBe("proposed");
    for (const value of content.values) expect(value.status).toBe("proposed");
    expect(content.about.mission.status).toBe("proposed");
    expect(content.about.vision.status).toBe("proposed");
  });

  it("does not ship photographs without confirmed consent", () => {
    for (const item of content.gallery) {
      if (item.kind === "photo") expect(item.consentConfirmed).toBe(true);
    }
  });
});

describe("optional contact channels", async () => {
  const { contactChannels } = await import("@/lib/channels");
  it("shows nothing until channels are supplied", () => {
    expect(contactChannels({})).toEqual([]);
  });
  it("builds safe links and ignores invalid values", () => {
    const links = contactChannels({ email: "office@example.test", whatsapp: "+263 77 000 0000", facebook: "javascript:alert(1)" });
    expect(links.map((l) => l.href)).toEqual(["mailto:office@example.test", "https://wa.me/263770000000"]);
  });
});
