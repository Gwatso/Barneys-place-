import { expect, test, type Page } from "@playwright/test";

const pages = [
  { path: "/", title: /Barney's Place \| ECD Centre in Aerodrome, Bindura/, h1: /Little Steps\.\s*Big Discoveries\./ },
  { path: "/about/", title: /^About Us \| Barney's Place/, h1: /A little place for growing big hearts/ },
  { path: "/learning-journey/", title: /^Learning Journey \|/, h1: /Learning through play/ },
  { path: "/admissions/", title: /^Admissions \|/, h1: /Your Child’s Next Little Adventure Starts Here/ },
  { path: "/gallery/", title: /^Gallery \|/, h1: /Little moments/ },
  { path: "/contact/", title: /^Contact \|/, h1: /We’d love to hear from you/ },
];

const isMobile = (page: Page) => (page.viewportSize()?.width ?? 1440) < 961;

function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  page.on("requestfailed", (r) => {
    // Next.js deliberately aborts some prefetch probes; anything else is a real failure.
    if (r.failure()?.errorText !== "net::ERR_ABORTED") errors.push(`${r.url()} ${r.failure()?.errorText}`);
  });
  return errors;
}

for (const p of pages) {
  test(`${p.path} renders without errors, overflow or broken images`, async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto(p.path, { waitUntil: "networkidle" });
    await expect(page).toHaveTitle(p.title);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(p.h1);
    await expect(page.locator("h1")).toHaveCount(1);

    const { scrollWidth, clientWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(scrollWidth, "no horizontal overflow").toBeLessThanOrEqual(clientWidth);

    const brokenImages = await page.evaluate(() =>
      Array.from(document.images).filter((img) => img.complete && img.naturalWidth === 0).map((img) => img.src),
    );
    expect(brokenImages).toEqual([]);

    await expect(page.getByText("OWNER PREVIEW · SAMPLE CONTENT")).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /Barney’s Place|Barney's Place/);
    expect(errors).toEqual([]);
  });
}

test("navigation works and marks the current page", async ({ page }) => {
  await page.goto("/");
  if (isMobile(page)) {
    const menu = page.getByRole("button", { name: "Open menu" });
    await expect(menu).toHaveAttribute("aria-expanded", "false");
    await menu.click();
    await expect(page.getByRole("button", { name: "Close menu" })).toHaveAttribute("aria-expanded", "true");
    await page.getByRole("navigation", { name: "Mobile" }).getByRole("link", { name: "Admissions" }).click();
    await expect(page).toHaveURL(/\/admissions\/$/);
    await expect(page.getByRole("navigation", { name: "Mobile" })).toHaveCount(0);
    // Escape closes the menu and returns focus to the button.
    await page.getByRole("button", { name: "Open menu" }).click();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
  } else {
    const nav = page.getByRole("navigation", { name: "Main" });
    await nav.getByRole("link", { name: "Learning Journey" }).click();
    await expect(page).toHaveURL(/\/learning-journey\/$/);
    await expect(nav.getByRole("link", { name: "Learning Journey" })).toHaveAttribute("aria-current", "page");
  }
});

test("hero calls to action lead to the right pages", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Explore Our Learning Journey" }).click();
  await expect(page).toHaveURL(/\/learning-journey\/$/);
  await page.goto("/");
  await page.getByRole("link", { name: "Talk to Our School" }).click();
  await expect(page).toHaveURL(/\/contact\/$/);
});

test("telephone and directions links are correct", async ({ page }) => {
  await page.goto("/contact/");
  await expect(page.getByRole("link", { name: /Call Barney’s Place on 0773 690 316/ })).toHaveAttribute("href", "tel:+263773690316");
  await expect(page.getByRole("link", { name: /Call Barney’s Place on 0776 631 541/ })).toHaveAttribute("href", "tel:+263776631541");
  const directions = page.getByRole("link", { name: /Get directions/ });
  await expect(directions).toHaveAttribute("href", /^https:\/\/www\.google\.com\/maps\/search\/\?api=1&query=.*Stand%20No\.%203103/);
  await expect(directions).toHaveAttribute("target", "_blank");
  await expect(directions).toHaveAttribute("rel", /noopener/);
  await expect(page.getByText("Registered with the Ministry of Primary and Secondary Education, Zimbabwe.").first()).toBeVisible();
  // No unconfirmed channels.
  await expect(page.locator('a[href^="mailto:"], a[href*="wa.me"], a[href*="facebook.com"]')).toHaveCount(0);
});

test("enquiry form validates and shows the demonstration notice without sending", async ({ page }) => {
  const posts: string[] = [];
  page.on("request", (r) => {
    if (r.method() === "POST") posts.push(r.url());
  });
  await page.goto("/admissions/");
  await page.getByRole("button", { name: "Send enquiry" }).click();
  await expect(page.getByLabel(/Parent or guardian name/)).toBeFocused();
  await expect(page.getByLabel(/Parent or guardian name/)).toHaveAttribute("aria-invalid", "true");
  await expect(page.getByText(/check the 3 highlighted fields/)).toBeVisible();

  await page.getByLabel(/Parent or guardian name/).fill("Tendai Moyo");
  await page.getByLabel(/Preferred contact number/).fill("12");
  await page.getByLabel(/Preferred contact number/).blur();
  await expect(page.getByText(/doesn’t look quite right/)).toBeVisible();
  await page.getByLabel(/Preferred contact number/).fill("077 123 4567");
  await page.getByLabel(/Enquiry topic/).selectOption("Arranging a visit");
  await page.getByRole("button", { name: "Send enquiry" }).click();
  await expect(page.getByText("This is a demonstration. Your enquiry has not been sent to the school.")).toBeVisible();
  await expect(page.getByRole("heading", { name: /Thank you, Tendai/ })).toBeFocused();
  expect(posts).toEqual([]);
});

test("questions accordion is keyboard operable", async ({ page }) => {
  await page.goto("/admissions/");
  const fees = page.getByRole("button", { name: "What are the fees, and how are they paid?" });
  await fees.focus();
  await page.keyboard.press("Enter");
  await expect(fees).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByRole("region", { name: /What are the fees/ })).toContainText("has not been published yet");
  await page.keyboard.press("Space");
  await expect(fees).toHaveAttribute("aria-expanded", "false");
});

test("gallery lightbox opens, browses and closes with focus returned", async ({ page }) => {
  await page.goto("/gallery/");
  await page.getByRole("button", { name: /Learning in Action/ }).click();
  await expect(page.getByText("Showing 3 of 12 pictures")).toBeVisible();
  const tile = page.getByRole("button", { name: /View full-screen: Story circle/ });
  await tile.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("button", { name: "Close viewer" })).toBeFocused();
  await page.keyboard.press("ArrowRight");
  await expect(dialog).toContainText("Counting together");
  await dialog.getByRole("button", { name: "Next picture" }).click();
  await expect(dialog).toContainText("Learning in the classroom");
  await expect(dialog).toContainText("Photo placeholder");
  await dialog.getByRole("button", { name: "Next picture" }).click();
  await expect(dialog).toContainText("Story circle");
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(tile).toBeFocused();
});

test("learning stepper disables Previous and Next at the ends", async ({ page }) => {
  await page.goto("/learning-journey/");
  const prev = page.getByRole("button", { name: "Previous" });
  const next = page.getByRole("button", { name: "Next chapter" });
  await expect(prev).toBeDisabled();
  for (let i = 0; i < 4; i += 1) await next.click();
  await expect(next).toBeDisabled();
  await expect(page.getByText("CHAPTER 5 OF 5")).toBeVisible();
  await page.getByRole("button", { name: /Nature and discovery/ }).click();
  await expect(page.locator("#area-title")).toHaveText("Nature and discovery");
});

test("structured data and robots reflect only supplied facts", async ({ page, request }) => {
  await page.goto("/");
  const json = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent()) ?? "{}");
  expect(json).toMatchObject({
    "@type": "Preschool",
    name: "Barney's Place",
    telephone: ["+263773690316", "+263776631541"],
    address: { streetAddress: "Stand No. 3103, Aerodrome Medium", addressLocality: "Bindura", addressCountry: "ZW" },
  });
  for (const forbidden of ["url", "email", "geo", "openingHours", "aggregateRating"]) expect(json).not.toHaveProperty(forbidden);
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toMatch(/Disallow: \//);
});

test("skip link moves focus to the main content", async ({ page }) => {
  await page.goto("/about/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to main content" });
  await expect(skip).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main")).toBeFocused();
});

test("reduced motion removes animations", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const animation = await page.locator(".anim-bob").first().evaluate((el) => getComputedStyle(el).animationName);
  expect(animation).toBe("none");
});
