# Studio PortMix — website

Bilingual (English / French) one-page website for Studio PortMix, an interior architecture studio with a showroom in Echandens, Switzerland.
Built with Next.js 16 (App Router), TypeScript, Tailwind CSS 4, Framer Motion, React Hook Form and Zod.

## 1. Run the project

```bash
npm install
cp .env.example .env.local   # optional, see below
npm run dev                  # http://localhost:3000 (redirects to /fr or /en)
```

Production build and checks:

```bash
npm run build && npm start
npm run lint
npx tsc --noEmit
```

Node 20+ is required. Port 3000 is the default; use `npm run dev -- -p 3117` if it is taken.

## 2. Images

All photography is registered in one file: `data/images.ts`.

- **PortMix work:** the Design & joinery section uses two photos of real PortMix joinery (Immeuble Prilly), stored in `public/images/portmix/`. A third photo from the same set, `prilly-window-joinery.jpg`, is available but not used yet.
- **Client selection:** the other images come from the client's Unsplash collection [Site internet](https://unsplash.com/collections/FA6LoMnzhog/Site-internet), except the Approach image (client and architect with samples).
- At the client's request the photos carry no captions.

To swap an image, change its `src` (a local path such as `/images/portmix/file.jpg`, or an Unsplash photo id), update `alt`, and keep `ratio` in sync with the file so layouts do not shift. The Unsplash `remotePatterns` entry in `next.config.ts` can be removed once no remote images remain.

The studio section shows working situations rather than portraits. Replace `images.architects` with real portraits when they are supplied (see the TODO in `components/sections/Studio.tsx`).

## 3. Replace contact details

`lib/site-config.ts` holds every contact value. The showroom locality (Echandens) is known; email, phone, street address and Instagram are `null` until provided, so nothing is invented. The Contact menu item scrolls to this block (`#contact`).

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

The official logo is `public/images/logo/studio-portmix.png`, cropped from the supplied PortMix-Studio-logo.png, and is rendered by `components/layout/Logo.tsx`.
For sharper rendering on large screens, an SVG export of the logo can replace the PNG (update the import in `Logo.tsx`).

The brand red used across the site is `--color-brand` in `app/globals.css`. It is sampled from the logo's red gradient.

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

## 6. Languages (English / French)

The site is bilingual. Every page lives under `app/[locale]`, so the URLs are `/en`, `/fr`, `/en/privacy`, `/fr/legal`, and so on.

- **Copy:** all text is in `data/content/en.ts` and `data/content/fr.ts`. Both files have exactly the same structure; TypeScript reports an error if a key is missing in French.
- **Default language:** visiting `/` redirects to `/fr` or `/en` based on the browser language, with French as the fallback (`proxy.ts`, `defaultLocale` in `lib/i18n.ts`).
- **Language switch:** EN / FR in the header and the mobile menu keeps the visitor on the equivalent page.
- **Form messages:** validation errors in `lib/project-inquiry/schema.ts` are keys; their texts live under `inquiry.validation` in each content file. The selected language is sent with each inquiry as `locale`.
- **Adding German later:** create `data/content/de.ts`, add `"de"` to `locales` and `localeLabels` in `lib/i18n.ts`, and register it in `dictionaries`.

Brand spelling is always **PortMix** with a capital M. Labels that contain the brand name opt out of the uppercase style so the capital M is kept.

## 7. Newsletter editor

A private editor for the studio's newsletters lives at **`/newsletter`**. It offers three templates based on the client mockups (Classique, Nuit, Sable) in French or English, with a live desktop and mobile preview.

**Access:** HTTP basic auth, user `NEWSLETTER_USER` (default `portmix`) and password `NEWSLETTER_PASSWORD`. Without a password the editor is open in development and disabled in production.

**Workflow for the client:**
1. Choose a template and language, then edit the texts, buttons, links and photos. Photos come from the client's Unsplash selection and the PortMix photos, or any `https://` image address.
2. Drafts save automatically in the browser. Use **Exporter / Importer** to move a draft to another computer.
3. **Copier HTML** or **Télécharger HTML**, then paste it into the sending platform (Brevo, Mailchimp, ...) as a custom HTML campaign. The platform handles the subscriber list, consent and unsubscribes.
4. Set the unsubscribe merge tag in the footer section to the platform's tag: Brevo `{{ unsubscribe }}`, Mailchimp `*|UNSUB|*`.

**Before the first real send:**
- Set `NEXT_PUBLIC_NEWSLETTER_ASSET_BASE` to the live site address (e.g. `https://www.studio-portmix.ch`). Emails load the logo, icons and PortMix photos from there. The editor shows a warning while it still points to localhost.
- Confirm the footer contact lines. The email is `info@portmix.ch`; `www.studio-portmix.ch` comes from the mockups. Both are editable per newsletter.
- Optional: set `RESEND_API_KEY` and `NEWSLETTER_FROM` to enable **Envoyer un test**, which sends one test email (`app/api/newsletter/send/route.ts`).

**Code:** `lib/newsletter/` holds the data model, default copy, templates, the email HTML renderer (600px tables, inline styles, Outlook fallbacks) and draft storage. `components/newsletter/` holds the editor UI. Email logos and icons are PNGs in `public/email-assets/`, since many email clients do not display SVG.

## Project structure

```
app/[locale]/            localized routes: home, privacy, legal, not-found
app/api/                 project inquiry, upload and newsletter test endpoints
app/newsletter/           newsletter editor (own root layout)
proxy.ts                 language redirect and newsletter editor protection
components/layout/       Header (with mobile menu), Footer, Logo, SkipLink, LegalPage
components/sections/     Hero, Studio, VisualBreak, Expertise, Advantage, Process, ProjectCta, ProjectInquirySection, Closing (in menu order)
components/forms/        multi-step project questionnaire
components/ui/           Container, Label, ArrowLink, Figure, Reveal, SplitLines, ImageReveal, SectionIntro
data/                    content dictionaries (en, fr) and image registry
lib/                     site config, i18n helpers, motion tokens, inquiry schema / delivery / upload / draft
public/images/logo/      logo file
```

## Notes

- Animations respect `prefers-reduced-motion` (Framer Motion `reducedMotion="user"` plus CSS).
- `/privacy` and `/legal` are placeholder pages awaiting final legal text.
- No analytics or third-party scripts are included.
