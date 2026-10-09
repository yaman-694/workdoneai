# workdoneai website

Marketing site for workdoneai, a custom business automation studio.
Built with Astro 7, Tailwind CSS 4 and GSAP.
The full brief and design decisions live in [PLAN.md](PLAN.md).

## Commands

| Command | What it does |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Start the dev server at `http://localhost:4321` |
| `npm run check` | Type-check Astro components and scripts |
| `npm run build` | Type-check, then build the static site to `dist/` |
| `npm run preview` | Serve the production build locally |

## Configuration

Copy `.env.example` to `.env` and set:

- `PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`: the Cloudflare Turnstile widget keys for the contact form bot check.
  Locally you can use Cloudflare's always-pass test keys listed in `.env.example`.
- `CONTACT_WEBHOOK_URL`: the n8n webhook that stores and emails contact form submissions.
- `CONTACT_WEBHOOK_SECRET`: a random string (`openssl rand -hex 32`) sent as the `X-Webhook-Secret` header.
  It must match the Header Auth credential on the n8n webhook node.

All four are required; the build and the API route fail fast when one is missing.

`@astrojs/vercel` is pinned to exactly 11.0.12.
Version 11.0.13 bundles a top-level `import "rolldown"` into the server function, which crashes on Vercel with "Cannot find native binding".
Check the built `.vercel/output/functions/_render.func/.vercel/output/server/entry.mjs` for that import before upgrading.

## Contact form flow

The form posts to `/api/contact`, the only route that runs as a Vercel function (every page stays static).
The endpoint drops spam-trap hits, checks every field against the form's own options and length limits, and verifies the Turnstile token with Cloudflare.
Only then does it forward the submission to n8n with the shared secret header, so the n8n URL and secret never reach the browser.
The n8n workflow "WorkDoneAI Contact Form" appends a row to the "WorkDoneAI Leads" Google Sheet and emails yaman@workdoneai.com through Hostinger SMTP.

## Where things live

| Path | Contents |
| --- | --- |
| `src/data/site.ts` | All homepage copy: stats, services, workflows, industries, FAQs |
| `src/components/sections/` | One component per homepage section |
| `src/components/ui/ImageSlot.astro` | Photo slot; renders a labelled placeholder until a real image is passed |
| `src/scripts/` | GSAP animations, smooth scroll, carousels, showcase tabs, contact form |
| `src/styles/global.css` | Tailwind theme: palette, fonts, fluid type scale |

## Before launch

- Replace every figure marked `example: true` or `[X hrs / week]` in `src/data/site.ts` with real client results.
- Review FAQ answers marked `[REVIEW]`.
- Add real photos: import them and pass `src` to each `ImageSlot`.
- Add privacy and terms text in `src/pages/privacy.astro` and `src/pages/terms.astro`.
- Set the four contact form variables from `.env.example` in Vercel, using real Turnstile keys for the `workdoneai.com` hostname.
- Swap the stand-in heading font (Newsreader) for P22 Mackinac Pro once an Adobe Fonts kit exists: load the kit in `BaseLayout.astro` and change `--font-serif` in `global.css`.
