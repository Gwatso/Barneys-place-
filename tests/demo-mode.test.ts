import { afterEach, describe, expect, it, vi } from "vitest";

async function load(env: Record<string, string | undefined>) {
  vi.resetModules();
  for (const [key, value] of Object.entries(env)) vi.stubEnv(key, value ?? "");
  const { site } = await import("@/config/site");
  const contentHelpers = await import("@/lib/content");
  const { gallery } = await import("@/content/school");
  return { site, ...contentHelpers, gallery };
}

afterEach(() => vi.unstubAllEnvs());

describe("demo mode switch", () => {
  it("defaults to the owner preview with proposed content and a demo-only form", async () => {
    const { site, isPublishable, publishableGallery, gallery } = await load({ NEXT_PUBLIC_DEMO_MODE: undefined });
    expect(site.demoMode).toBe(true);
    expect(site.enquiry).toEqual({ kind: "demo" });
    expect(isPublishable("proposed")).toBe(true);
    expect(publishableGallery(gallery).some((i) => i.kind === "placeholder")).toBe(true);
  });

  it("hides proposed content and placeholders when switched off", async () => {
    const { site, isPublishable, showProposedTag, publishableGallery, gallery } = await load({ NEXT_PUBLIC_DEMO_MODE: "false" });
    expect(site.demoMode).toBe(false);
    expect(isPublishable("proposed")).toBe(false);
    expect(isPublishable("verified")).toBe(true);
    expect(isPublishable("approved")).toBe(true);
    expect(showProposedTag("proposed")).toBe(false);
    expect(publishableGallery(gallery)).toHaveLength(0);
  });

  it("only sends enquiries when an approved endpoint is configured and demo mode is off", async () => {
    expect((await load({ NEXT_PUBLIC_DEMO_MODE: "false", NEXT_PUBLIC_ENQUIRY_ENDPOINT: "" })).site.enquiry).toEqual({ kind: "none" });
    expect((await load({ NEXT_PUBLIC_DEMO_MODE: "false", NEXT_PUBLIC_ENQUIRY_ENDPOINT: "https://forms.example.test/abc" })).site.enquiry).toEqual({
      kind: "endpoint",
      url: "https://forms.example.test/abc",
    });
    expect((await load({ NEXT_PUBLIC_DEMO_MODE: "true", NEXT_PUBLIC_ENQUIRY_ENDPOINT: "https://forms.example.test/abc" })).site.enquiry).toEqual({ kind: "demo" });
    expect((await load({ NEXT_PUBLIC_DEMO_MODE: "false", NEXT_PUBLIC_ENQUIRY_ENDPOINT: "javascript:alert(1)" })).site.enquiry).toEqual({ kind: "none" });
  });
});
