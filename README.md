# Hotel Klika & Klika Kitchen & Coffee

Multilingual (Czech / English / German) website for **Hotel Klika** and
**Klika Kitchen & Coffee** in České Budějovice.

The entire codebase — files, folders, identifiers, comments — is in English.
Only the site's *content* is multilingual.

---

## Technology

| | |
| --- | --- |
| Framework | Next.js 16.2 (App Router, `src/app`) |
| UI | React 19.2, Server Components by default |
| Language | TypeScript 5.9, `strict` + `noImplicitAny` |
| Styling | Tailwind CSS 4 (CSS-first `@theme` tokens) |
| Icons | lucide-react |
| Fonts | Geist, Lobster, Caveat — self-hosted via `next/font/local` |
| Lint | ESLint 9 + `eslint-config-next` (flat config) |

**No** UI kit, animation library, carousel, lightbox, form or data-fetching
library. The slider, lightbox, tabs, accordion, focus traps and forms are all
built by hand with React, CSS and browser APIs.

There is no database, auth, payment gateway, CMS or booking API. All content
lives in typed TypeScript modules under `src/content`, shaped so it can be
swapped for an API later without touching the UI.

### Version notes

- **ESLint is pinned to 9.x, not 10.** `eslint-config-next@16.2.10` depends on
  `eslint-plugin-react@7.37`, which is not compatible with ESLint 10's rule
  context API and crashes on load. ESLint 9 is the working combination.
- **TypeScript is pinned to 5.9, not 7.** TS 7 (the native port) is now
  `latest` on npm, but 5.9 is the version Next 16's type plugin and
  `typescript-eslint` are proven against.

---

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000 → redirects to /cs
```

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |

All three must pass before committing. TypeScript and ESLint errors are fixed,
never suppressed — there is no `@ts-ignore`, `@ts-nocheck` or file-level
`eslint-disable` in the codebase.

---

## Architecture

```
src/
  app/[locale]/        Routes. The ROOT LAYOUT lives here (see below).
  assets/fonts/        Self-hosted woff2 + OFL licences
  components/
    booking/  gallery/  hotel/  illustrations/
    layout/  location/  restaurant/  sections/  ui/
  content/             All copy and data (the future CMS boundary)
    dictionaries/      UI strings: cs.ts (source of truth), en.ts, de.ts
  lib/                 i18n, metadata, structured data, hooks, utils
  types/               Domain types — no `any` anywhere
public/
  images/{hero,hotel,rooms,restaurant,food,location,placeholders}/
  video/               Hero video goes here (see public/video/README.md)
```

### Never render a manual `<head>` in the layout

React reconciles that subtree on hydration and **strips the tags Next injected
into it** — including `<meta name="viewport">`. Without it, mobile silently
falls back to a 980px layout viewport and the whole page can be panned
sideways. The intro script lives at the top of `<body>` instead, where it still
runs before the body is parsed. Use the Metadata API for anything head-related.

### Why the root layout is at `src/app/[locale]/layout.tsx`

`<html lang>` must reflect the language of the page. A layout at `src/app/`
cannot read route params, so every English and German page would announce
itself as Czech to screen readers and search engines. Putting the root layout
under `[locale]` is the standard Next.js i18n pattern and the only way to get
`lang` right. Consequently:

- `/` → `/cs` is redirected in `next.config.ts` (no middleware needed).
- `src/app/[locale]/not-found.tsx` is the branded 404.
- `src/app/[locale]/[...rest]/page.tsx` catches unmatched paths so they reach
  that 404 instead of the framework's unstyled default.
- `robots.ts` and `sitemap.ts` sit at `src/app/` — route handlers need no layout.

### Design system

Tokens live in `src/app/globals.css` under `@theme`. The primaries are the
authoritative owner-supplied values — **navy `#0A1A31`** and **blue
`#AED3FA`** — plus the warm terracotta accent pair **`#C56D3F` /
`#A95531`** (hover). The decisions below are load-bearing and were made against
measured contrast ratios, not by eye:

- **Button hierarchy**: `conversion` (terracotta + warm-white — the booking
  actions), `primary` (navy + warm-white, 17.1:1), `secondary` (brand blue +
  navy, 11.2:1), plus `outline`/`ghost` and `cream` for dark surfaces.
- **The conversion variant enforces large bold type.** Terracotta with
  warm-white text is 3.67:1 — below AA for normal text, above the 3:1
  large-text bar — so the variant hard-codes a ≥19px bold label and ignores the
  `size` prop's font size. Never add small text inside it, and never use it
  below `size="lg"`.
- **Accent as ink is large-text-only** (3.1–3.7:1 on light surfaces, 4.7:1 on
  navy). It carries the Caveat handwriting and arrows, active dots and
  selected-state markers — never body-size links or text-bearing active tabs,
  which stay navy.
- **`--color-sand-ink` (#96774B)** remains the quiet beige ink for list bullets
  and informational callouts.
- **`--color-alert` is semantic only** — form validation, never a button or a
  decorative accent. An error still has to look like an error.

The focus ring is two-tone (navy outline + light-blue halo) so it stays visible
on both light and navy surfaces; a single colour cannot do both.

**Watch out:** never add `hidden` to a `<Button>` via `className`. The component
sets `inline-flex`, and in Tailwind's cascade `.inline-flex` wins over
`.hidden`, so the button stays visible. Wrap it in a `<div className="hidden
lg:flex">` instead.

### Translation architecture

- **UI strings** — `src/content/dictionaries/`. `cs.ts` is the source of truth;
  `Dictionary` is derived from it with `typeof`, so `en.ts` and `de.ts` are
  compile-time checked against its exact shape. A missing or misspelled key is
  a type error, never a silent fallback.
- **Content data** — every translatable field is `LocalizedText`
  (`Record<Locale, string>`), so a new language means adding one key per entry
  and one dictionary file.
- Names, prices, addresses, phone numbers, times and business facts are never
  translated.
- The language switcher preserves the current page: `/cs/hotel` ⇄ `/en/hotel`.
  No Google Translate, no automatic browser translation.

### Content architecture (admin-panel integration points)

| File | Contents | Notes |
| --- | --- | --- |
| `content/daily-menu.ts` | Daily menu | **Primary integration point.** `getDailyMenu()` is the only thing the UI calls; returns `null` → empty state. Replace its body with a fetch. |
| `content/menu.ts` | À la carte menu, allergens | Grouped by `category` at render time; new items/categories need no component change. |
| `content/hotel.ts` | Rooms, price list, buildings, services, offers | |
| `content/restaurant.ts` | Zones, producers, drinks, vouchers | |
| `content/location.ts` | Travel options, landmarks, trip tips | |
| `content/contact.ts` | Phones, e-mails, address, hours, billing, map embed | `mapEmbedUrl` is the Google Maps embed; hotel and restaurant share one address so one URL serves every map. |
| `content/gallery.ts` | Gallery items | |

**Allergens are never prices.** In the source material the allergens of one
dish are written together as `13710`, meaning allergens 1, 3, 7 and 10 — not
13,710 CZK. They are modelled as `AllergenNumber[]`, rendered as individual
labelled boxes by `<AllergenList />`, and kept visually and structurally
separate from `<Price />`.

---

## Booking prototypes

Both booking flows are **front-end only**. They are honest about it:

- No payment, no availability check, no reservation is created.
- No fake confirmation screen exists anywhere, and none must be added until a
  real backend can make it true.
- Drafts persist in **sessionStorage** (not localStorage) so a half-finished
  enquiry with someone's name and phone does not outlive the tab on a shared
  computer. Storage failures fall back to memory and warn the guest.

**Hotel** (`/[locale]/hotel/booking`) — six steps: dates → room → room detail →
guest details → summary → contact. Pre-fills from `?arrival=&departure=&guests=&room=`.
Ends on: *"Toto je předběžný výběr pobytu. Dostupnost pokoje musí potvrdit
recepce."* plus phone / e-mail / WhatsApp actions.

**Restaurant** (`/[locale]/restaurant/booking`) — ends on: *"Vaše poptávka ještě
nebyla potvrzena. Pro dokončení rezervace kontaktujte restauraci."* plus phone
and e-mail.

The indicative hotel total is `nightly rate × nights`, excludes parking and the
city tourist fee, and is labelled as indicative. Rooms without a published rate
show "price on request" rather than a number.

---

## Assets — what is real and what is a placeholder

**Real:** the three fonts. Lobster and Caveat are the font files supplied by the
owner; Geist is the official release. All three are subset to Latin + Latin
Extended-A so Czech and German render from one file each, with licences in
`src/assets/fonts/` (see the README there for the subsetting command).

**Real production assets** (owner-supplied):

- **Logo** — the full set in `public/images/logos/{original,web,favicon}`,
  rendered by `src/components/ui/Logo.tsx` through next/image at display size
  (never the multi-megapixel originals). The artwork is navy on transparency;
  dark surfaces reuse the same file through the `.logo-on-dark` filter.
- **Favicons** — the complete supplied set (ico, 16–48px PNGs, apple-touch,
  android-chrome via `site.webmanifest`), wired through the Next metadata API
  in the root layout.
- **Hero video** — `video-loop-{desktop,mobile}-optimized.mp4`, selected per
  viewport; the non-optimized exports stay as unreferenced backups. Posters
  `fallback-{desktop,mobile}.webp` are art-directed via `<picture>`, so each
  device downloads exactly one.
- **Photography** — split images, all five carousel rooms, all three seating
  zones (`.webp`), used on the landing page, hotel/rooms pages, restaurant page
  and gallery.

**Still placeholders** (no production file was supplied for these names):
`hotel/{facade,reception,breakfast}.png`, `food/*.png`, `location/*.png`,
`restaurant/{bar,conservatory-detail,garden-children}.png`,
`rooms/apartment-sauna-detail.png`, `placeholders/generic.png` (also standing
in for the long-stay apartments, which have no photo). All remain marked
`isPlaceholder: true` in `src/content` and visibly labelled.

Replacing any image needs **no code change**: keep the filename and aspect
ratio, drop the file in, and remove `isPlaceholder` from the matching entry in
`src/content`. Sizes are declared in the content modules, so a same-ratio swap
causes no layout shift. `<SafeImage />` falls back to a labelled placeholder if
a file is missing.

---

## Deployment (Vercel)

1. Import the repository. Framework preset: Next.js. No build config needed.
2. Set `NEXT_PUBLIC_SITE_URL` to the production origin
   (e.g. `https://www.hotelklika.cz`).

`robots.ts` only allows crawling when `NEXT_PUBLIC_SITE_URL` matches the
production domain, so preview deployments stay out of the index automatically.
Every page is statically prerendered (49 routes: 14 pages × 3 locales + assets).

---

## Accessibility & performance notes

- Semantic HTML, one `<h1>` per page, skip link, visible focus ring everywhere.
- Dialogs (mobile nav, lightbox) trap focus, close on Escape, lock background
  scroll and restore focus to their trigger.
- The room slider pauses on hover, on focus, when the tab is hidden, and on
  manual control; it has an explicit pause button and never autoplays under
  `prefers-reduced-motion` (WCAG 2.2.2).
- `prefers-reduced-motion: reduce` disables animation site-wide; the hero video
  is never even mounted. All content stays available without motion.
- The hero poster is the real above-the-fold asset — first paint never waits on
  video. Missing video, blocked autoplay or an unsupported codec simply leave
  the poster in place.
- The Google map renders directly (owner's requirement) on the homepage,
  contact and location pages — one embed per page, bounded by its frame so it
  can never cause horizontal overflow.
- The lightbox is dynamically imported and preloads only adjacent images.

---

## Content verification required

Everything below comes from the supplied material and is rendered as given, but
should be confirmed by the owner before launch. Nothing here was invented — the
open questions are listed rather than guessed.

**Facts to confirm**

- 85 beds, 26 rooms, 9 apartments.
- Current room prices and the 24 March – 31 December 2026 validity period.
- The current daily menu (`content/daily-menu.ts` is dated 15 July 2026 and is
  explicitly labelled demo data in the UI).
- The à la carte menu — it changes roughly monthly.
- Public transport lines 1, 3, 14, 21 and the U Zelené ratolesti stop.
- Special-offer conditions (5 % cash / 10 % direct 3+ nights). Presented as
  coupon-dependent and "confirm with reception", never as guaranteed.

**Deliberately left blank rather than guessed**

- **Price units.** The source states a unit only for bicycle rental (per day)
  and the tourist fee (per person per day). *Each additional person (800 CZK)*,
  *dog (500 CZK)* and *parking (300 CZK)* have **no unit rendered** — per night
  vs. per stay was not stated. Set `unit` in `content/hotel.ts` once confirmed.
- **Which rates carry the asterisk.** Applied to all room rates
  (`hasSeasonalException: true`). Confirm whether it also covers the extra-person
  charge.
- **Garden capacity** — not supplied, so no seat count is shown (`seats: null`).
- **Long-stay apartments** — no bed count or rate published; renders "price on
  request" with no capacity.
- **The address** carries both published street lines (Hroznová 487/25 and
  nábřeží Jindřicha Libraria 158/3). Confirm which should lead.
- **Drink prices** — none supplied, none invented.
- **Privacy policy** — `/[locale]/privacy` is a deliberate placeholder. A
  privacy policy is legally binding; plausible-sounding invented clauses would
  be worthless and misleading. It is `noindex` until the operator supplies text.

**Never fabricated:** star ratings, review counts, awards, guest statistics,
transport timetables, availability, or a price range. The structured data
omits `starRating`, `aggregateRating` and `review` for exactly this reason.
