# Studio Portmix — website

Editorial one-page website for Studio Portmix, an interior architecture studio in French-speaking Switzerland.
Built with Next.js 16 (App Router), TypeScript, Tailwind CSS 4, Framer Motion, React Hook Form and Zod.

## 1. Run the project

```bash
npm install
cp .env.example .env.local   # optional, see below
npm run dev                  # http://localhost:3000
```

Production build and checks:

```bash
npm run build && npm start
npm run lint
npx tsc --noEmit
```

Node 20+ is required. Port 3000 is the default; use `npm run dev -- -p 3117` if it is taken.

## 2. Replace the stock images

All photography is registered in one file: `data/images.ts`.
Every entry is an Unsplash placeholder chosen for art direction. None are Studio Portmix projects and the UI labels them "Design inspiration" or "Reference imagery".

To swap in real photography:

1. Put the files in `public/images/<section>/`.
2. Change the entry's `src` to the local path, update `alt`, and keep `ratio` in sync with the file so layouts do not shift.
3. When no Unsplash URLs remain, delete the `remotePatterns` entry in `next.config.ts`.

Once real project photos are used, remove the "Design inspiration" / "Reference imagery" captions and disclaimers in `data/content/en.ts` (keys `common.designInspiration`, `spaces.disclaimer`, `gallery.disclaimer`).

The studio section deliberately shows working situations rather than stand-in portraits. Replace `images.architects` with real portraits when they are supplied (see the TODO in `components/sections/Studio.tsx`).

## 3. Replace contact details

`lib/site-config.ts` holds every contact value. They are all `null` on purpose so nothing is invented:

```ts
contact: {
  email: null,          // "hello@example.ch"
  phone: null,          // "+41 …"
  addressLines: null,   // ["Rue …", "1000 Lausanne"]
  instagram: null,      // "https://instagram.com/…"
}
```

Filling these in updates the closing section, the footer Instagram link and the JSON-LD structured data automatically. `NEXT_PUBLIC_SITE_URL` in `.env.local` sets the canonical domain used by metadata, `sitemap.xml` and `robots.txt`.

## 4. Logo

The logo is loaded from `public/images/logo/studio-portmix.svg` by `components/layout/Logo.tsx`.
The file currently in that location is a clearly marked text placeholder: **replace it with the official Studio Portmix artwork under the same filename** (or update the import). The component scales by height, so any proportion works.

The brand red used across the site is `--color-brand` in `app/globals.css`. Match it to the exact red of the official logo file.

Favicons (`app/favicon.ico`, `app/icon.png`, `app/apple-icon.png`) are neutral placeholders to replace as well.

## 5. Connect the project inquiry form

The questionnaire posts JSON to `POST /api/project-inquiry` (`app/api/project-inquiry/route.ts`), which validates against the shared Zod schema in `lib/project-inquiry/schema.ts` and calls `deliverInquiry()` in `lib/project-inquiry/delivery.ts`.

Out of the box nothing is sent anywhere: submissions are validated and accepted, and the response reports `delivered: false`. To connect a backend, choose one:

- **Webhook / Laravel API (already wired):** set `INQUIRY_WEBHOOK_URL` (and optionally `INQUIRY_WEBHOOK_SECRET`, sent as a Bearer token). Each valid submission is POSTed as `{ type, receivedAt, meta, inquiry }`.
- **Resend or SMTP:** follow the commented examples in `delivery.ts`; `renderInquiryText()` gives you a plain-text email body.

A honeypot field (`website`) is included; anything that fills it is dropped silently.

### File uploads

`lib/project-inquiry/upload.ts` abstracts uploads behind an adapter. The default `simulated` mode keeps files in the browser and tells the user that storage is not connected yet. To enable real uploads:

1. Implement storage in `app/api/upload/route.ts` (S3, Cloudflare R2, Laravel, or local disk; examples are in the file) so it returns `{ id, url }`.
2. Set `NEXT_PUBLIC_UPLOAD_MODE=api`.

Attachment metadata (name, size, type, url) is then included in the inquiry payload.

Answers autosave to `localStorage` for two weeks (`lib/project-inquiry/draft.ts`) and are cleared on successful submission.

## 6. Add translations

All copy lives in `data/content/en.ts` as one typed dictionary; components never contain hard-coded text. `lib/i18n.ts` exposes `getContent(locale)`.

To add French or German:

1. Copy `data/content/en.ts` to `fr.ts` / `de.ts` and translate the values (keep the structure).
2. Register the file in `dictionaries` inside `lib/i18n.ts`.
3. Introduce locale routing (for example `app/[locale]/…`) or a locale switcher, and pass the locale into `getContent()` where pages and the root layout call it.

Validation messages in `lib/project-inquiry/schema.ts` are the one place with English strings outside the dictionary; move them into the content file when localising.

## Project structure

```
app/                     routes, metadata, API routes, sitemap, robots, icons
components/layout/       Header (with mobile menu), Footer, Logo, SkipLink, LegalPage
components/sections/     homepage sections: Hero, Studio, VisualBreak, Expertise, Advantage, Spaces, Process, Gallery, ProjectCta, ProjectInquirySection, Closing
components/forms/        multi-step project questionnaire
components/ui/           Container, Label, ArrowLink, Figure, Reveal, SplitLines, ImageReveal, SectionIntro
data/                    content dictionary and image registry
lib/                     site config, i18n helpers, motion tokens, inquiry schema / delivery / upload / draft
public/images/logo/      logo file
```

## Notes

- Animations respect `prefers-reduced-motion` (Framer Motion `reducedMotion="user"` plus CSS).
- `/privacy` and `/legal` are placeholder pages awaiting final legal text.
- No analytics or third-party scripts are included.
