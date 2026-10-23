import { describe, expect, it, vi } from "vitest";
import { cleanEnquiry, sanitiseText, submitEnquiry, validateEnquiry, type EnquiryInput } from "@/lib/enquiry";

const valid: EnquiryInput = { name: "Tendai Moyo", phone: "077 123 4567", topic: "Fees", message: "Hello" };

describe("validateEnquiry", () => {
  it("accepts a complete enquiry", () => {
    expect(validateEnquiry(valid)).toEqual({});
  });

  it("requires name, phone and topic but not message", () => {
    const errors = validateEnquiry({ name: "", phone: "", topic: "", message: "" });
    expect(Object.keys(errors).sort()).toEqual(["name", "phone", "topic"]);
  });

  it("rejects malformed phone numbers", () => {
    expect(validateEnquiry({ ...valid, phone: "12" }).phone).toBeDefined();
    expect(validateEnquiry({ ...valid, phone: "077abc4567" }).phone).toBeDefined();
    expect(validateEnquiry({ ...valid, phone: "+263 77 123 4567" }).phone).toBeUndefined();
  });

  it("only allows configured topics", () => {
    expect(validateEnquiry({ ...valid, topic: "Free pizza" }).topic).toBeDefined();
  });

  it("limits message length", () => {
    expect(validateEnquiry({ ...valid, message: "x".repeat(501) }).message).toBeDefined();
  });
});

describe("sanitising", () => {
  it("strips markup characters and control characters", () => {
    expect(sanitiseText("<b>Tendai</b>\u0007", 80)).toBe("bTendai/b");
  });

  it("collapses whitespace in single-line fields and keeps line breaks in messages", () => {
    expect(cleanEnquiry({ ...valid, name: "  Tendai   Moyo ", message: "Line 1\r\n\r\n\r\n\r\nLine 2" })).toMatchObject({
      name: "Tendai Moyo",
      message: "Line 1\n\nLine 2",
    });
  });
});

describe("submitEnquiry", () => {
  it("never calls the network in demo mode", async () => {
    vi.useFakeTimers();
    const fetchSpy = vi.fn();
    const pending = submitEnquiry(valid, { kind: "demo" }, fetchSpy as unknown as typeof fetch);
    await vi.runAllTimersAsync();
    expect(await pending).toEqual({ ok: true, delivered: false, demo: true });
    expect(fetchSpy).not.toHaveBeenCalled();
    vi.useRealTimers();
  });

  it("reports delivery only on a 2xx response", async () => {
    const ok = vi.fn().mockResolvedValue({ ok: true });
    expect(await submitEnquiry(valid, { kind: "endpoint", url: "https://example.test/f" }, ok)).toMatchObject({ ok: true, delivered: true });
    const body = JSON.parse(ok.mock.calls[0][1].body);
    expect(body).toMatchObject({ name: "Tendai Moyo", topic: "Fees" });

    const rejected = vi.fn().mockResolvedValue({ ok: false, status: 500 });
    expect(await submitEnquiry(valid, { kind: "endpoint", url: "https://example.test/f" }, rejected)).toEqual({ ok: false, reason: "rejected" });

    const offline = vi.fn().mockRejectedValue(new TypeError("Failed to fetch"));
    expect(await submitEnquiry(valid, { kind: "endpoint", url: "https://example.test/f" }, offline)).toEqual({ ok: false, reason: "network" });
  });

  it("refuses when no delivery method is configured", async () => {
    expect(await submitEnquiry(valid, { kind: "none" })).toEqual({ ok: false, reason: "unavailable" });
  });

  it("refuses invalid input without sending", async () => {
    const spy = vi.fn();
    expect(await submitEnquiry({ ...valid, phone: "" }, { kind: "endpoint", url: "https://example.test/f" }, spy)).toEqual({ ok: false, reason: "invalid" });
    expect(spy).not.toHaveBeenCalled();
  });
});
