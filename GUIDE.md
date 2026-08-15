# MSARW — Cinematic Portfolio (Next.js)

A premium, cinematic portfolio site for a freelance film editor & colorist.
Built with Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion + Lenis.

## Getting started

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Editing content

Nothing is hardcoded in the components. All copy, stats, projects, services,
process steps, testimonials, and FAQ live in plain JSON files under
`/content`:

- `content/site.json` — name, tagline, bio, contact links, stats
- `content/projects.json` — featured work grid (images + optional videos)
- `content/services.json`
- `content/process.json`
- `content/testimonials.json`
- `content/faq.json`
- `content/toolset.json`

Edit these files directly and refresh — no rebuild step, no CMS account
needed. If you later want a headless CMS (Sanity, Contentful, etc.), the
single integration point is `src/lib/content.ts` — swap the JSON imports for
fetch calls there and every component keeps working unchanged.

## Adding real video edits

Featured work cards support two states per project:

1. `video: null` (default) — shows the still image, with a "Reel Coming
   Soon" badge on hover and in the click-to-open modal.
2. `video: "/videos/your-file.mp4"` — the card auto-plays a muted preview
   on hover (desktop) and opens a full player with controls + sound when
   clicked.

To enable a real edit: drop an `.mp4` into `public/videos/`, then set that
project's `video` field in `content/projects.json` to the matching path.
See `public/videos/README.md` for export recommendations.

## The custom cursor

The cursor was deliberately built so a visitor can never lose their pointer:

- The native OS cursor is visible by default (`cursor: auto`).
- The decorative ring + dot are only ever added on top — we hide the native
  cursor (`cursor: none`) exclusively after the custom cursor has mounted,
  confirmed it's a fine-pointer (mouse) device, and started tracking.
- If the pointer leaves the browser window, or the visitor is on a touch
  device, or JS fails to load, the native arrow stays visible.
- The ring/dot are solid, high-contrast white with a soft glow, not reliant
  on blend modes, so they read clearly against the dark background.

See `src/components/CustomCursor.tsx`.

## Tech stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS for styling
- Framer Motion for scroll reveals, the nav overlay, the loader, and modals
- Lenis for smooth scrolling (`src/components/SmoothScroll.tsx`, wrapped around the page content in `src/app/layout.tsx`)
- Local JSON content, no database or CMS required

## Deployment

This is a standard Next.js app — deploys as-is to Vercel:

```bash
pnpm build
```

Push to a GitHub repo and import it in Vercel, or run `vercel` from the
project root. No environment variables are required for the base site.

## Placeholder media

Portrait, project thumbnails, and testimonial photos currently use
`picsum.photos` as neutral stand-ins so the site is fully previewable out of
the box. Swap `content/site.json` and `content/projects.json` image URLs
for your own hosted images (e.g. in `/public/images`) whenever you're ready.
