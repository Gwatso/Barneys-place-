# Barney's Place — website

Website for **Barney's Place**, an Early Childhood Development (ECD) Centre at
Stand No. 3103, Aerodrome Medium, Bindura, Zimbabwe.

It is currently an **owner preview**: it shows proposed sample copy (marked
"Proposed") so the owners can review the finished website before approving
content for the public launch.

- Next.js 16 (App Router) + React 19 + TypeScript, exported as a fully static site
- Plain CSS with design tokens (`src/styles/tokens.css`), no UI framework
- Self-hosted fonts (Fredoka, Nunito Sans — SIL Open Font License)
- Original inline SVG illustrations; no stock or AI photographs
- No analytics, trackers, cookies or third-party scripts

## Run it locally

Requires Node.js 20.9 or later.

```bash
npm install
npm run dev          # http://localhost:3000 with live reload
```

Preview the production build:

```bash
npm run build        # writes the static site to out/
npm start            # serves out/ on http://localhost:3000
```

## Checks

```bash
npm run lint         # ESLint (Next.js + accessibility rules)
npm run typecheck    # TypeScript
npm test             # Vitest unit and component tests
npm run build        # production build
npm run test:e2e     # Playwright: builds must exist; tests 390/768/1024/1440px widths
npm run check        # lint + typecheck + test + build
```

## Owner preview (demo) mode

Everything that differs between the preview and the public site is decided in
one file, [`src/config/site.ts`](src/config/site.ts), driven by build-time
environment variables (see [`.env.example`](.env.example)):

| Variable | Default | Effect |
| --- | --- | --- |
| `NEXT_PUBLIC_DEMO_MODE` | `true` | Owner-preview bar, "Proposed" tags, sample copy, gallery placeholders, demo-only enquiry form, `noindex` everywhere |
| `NEXT_PUBLIC_SITE_URL` | empty | Once the real domain is known: canonical URLs, Open Graph image, XML sitemap |
| `NEXT_PUBLIC_ENQUIRY_ENDPOINT` | empty | Approved form-delivery URL, used only when demo mode is off |

**To leave preview mode**, build with `NEXT_PUBLIC_DEMO_MODE=false`
(for example in a `.env.production.local` file or your host's build settings).
Then:

- the preview bar and all "Proposed" tags disappear;
- any content still marked `status: "proposed"` is hidden, and pages fall back
  to neutral, verified wording;
- gallery placeholders are hidden; with no approved items the Gallery link is
  removed from the navigation and the page says photos are coming soon;
- search engines may index the site.

## Changing content

All school information and copy lives in
[`src/content/school.ts`](src/content/school.ts). Components never hard-code
school details.

- **School details** (name, address, phone numbers, registration statement):
  edit the `school` object. Phone numbers need both a `display` form and an
  international `e164` form (`+263...`) for tap-to-call links.
- **Approving copy:** change a block's `status` from `"proposed"` to
  `"approved"`. Approved blocks appear in the public build.
- **Owners' story:** add paragraphs to `about.story.text` and approve it.
- **Admissions answers:** add a `confirmedAnswer` to any item in
  `admissions.questions`; unanswered questions say "Please ask the school".
- **Contact channels:** add confirmed values to `school.channels` (email,
  WhatsApp, social). Nothing is shown while they are empty.

### Adding authorised photographs

1. Get written consent from parents/guardians for any child who can be identified.
2. Optimise the image (JPEG/WebP, about 1600px on the longest side) and put it
   in `public/gallery/`.
3. Add an item to `gallery` in `src/content/school.ts`:

```ts
{
  id: "story-time",
  kind: "photo",
  status: "approved",
  src: "/gallery/story-time.jpg",
  width: 1600,
  height: 1067,
  alt: "Children sitting in a circle listening to a story", // describe the photo
  consentConfirmed: true,
  title: "Story time",
  caption: "Story circle in the morning.",
  category: "learning",
}
```

Then delete the placeholder it replaces. Photos without
`consentConfirmed: true` are never published.

## Enquiry form

- **Demo mode:** validates the form and shows a confirmation that says
  *"This is a demonstration. Your enquiry has not been sent to the school."*
  Nothing leaves the browser and nothing is stored or logged.
- **Public, with `NEXT_PUBLIC_ENQUIRY_ENDPOINT`:** sends a JSON `POST`
  (`name`, `phone`, `topic`, `message`, `source`) to that URL and only reports
  success on a 2xx response; otherwise it shows an error with the phone number.
  Use an approved service (e.g. Formspree/Basin/Getform, or the school's own
  backend). Validation and sanitising live in `src/lib/enquiry.ts` so a backend
  can reuse them.
- **Public, no endpoint:** the form is replaced by call buttons.

## Deployment

`npm run build` produces a static site in `out/` that can be uploaded to any
static host (Netlify, Cloudflare Pages, GitHub Pages, cPanel hosting, S3...).
Routes use trailing slashes (`/about/` → `out/about/index.html`).

- `public/_headers` sets security headers on Netlify/Cloudflare Pages; mirror
  them on other hosts. Add the enquiry endpoint's origin to `connect-src` if one
  is configured.
- Do not deploy publicly until the owners have approved the content and
  `NEXT_PUBLIC_DEMO_MODE=false` is set.

## Project structure

```
src/
  app/                 routes: /, /about, /learning-journey, /admissions, /gallery, /contact
  components/          layout (header, footer, preview bar), page sections, gallery, form, icons
  components/illustrations/  original SVG artwork (logo mark, Pip mascot, scenes)
  config/site.ts       demo mode and integrations
  content/school.ts    all school information and copy (typed)
  lib/                 content governance, enquiry validation/delivery, SEO helpers
  styles/              tokens, base, components, sections
tests/                 Vitest unit and component tests
e2e/                   Playwright end-to-end and responsive checks
```

## Still needed from the owners

- Approval (or edits) of all proposed copy, the proposed logo and the Pip mascot
- Confirmation that the website will not use the cartoon characters on the
  current school sign (they belong to a third party)
- Answers on ages, places, fees and documents, if they should be published
- An enquiry-delivery method (or phone-only)
- Authorised photographs with consent, and the owners' story if wanted
- The domain name, hosting, and an exact map location if desired
