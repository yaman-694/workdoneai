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

- `PUBLIC_CONTACT_WEBHOOK_URL`: the n8n (or other) webhook that receives contact form submissions as JSON.
  Without it the form shows a "not connected" message instead of sending.

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
- Set `PUBLIC_CONTACT_WEBHOOK_URL` in the hosting environment.
- Swap the stand-in heading font (Newsreader) for P22 Mackinac Pro once an Adobe Fonts kit exists: load the kit in `BaseLayout.astro` and change `--font-serif` in `global.css`.
