# workdoneai - Website Plan

Workdoneai is a custom business automation studio.
The website sells expertise and an automation service, not a software product.
It will be built with Astro as a static site at `workdoneai.com`.

## 0. Open decisions

These items conflict between the earlier notes in this file and the full brief, or need a choice before build starts.

| Item | Decision | Status |
| --- | --- | --- |
| Tech stack | Astro 7 + Tailwind CSS 4 + GSAP, static output | Built |
| Brand name | `workdoneai`, all lowercase | Built |
| Domain | `workdoneai.com` | Set as `site` in `astro.config.mjs` |
| Supporting tagline | "We design and build custom automations that eliminate repetitive work from your business." | Used; "Workflow that works for you" not used |
| Primary CTA | "Let's Automate →" | Used; "Automate My Business" not used |
| Secondary CTA | "See How It Works ↓" | Built |
| Color palette | Lavender palette (section 5) with `--ink` `#4A4370` for text, links and lines | Built |
| Heading font | P22 Mackinac Pro via Adobe Fonts | Open: no kit yet, Newsreader is the stand-in |
| Hero visual | Photo hero with overlay text and results; workflow animation in the showcase | Built with placeholder photo |
| Contact form backend | n8n webhook via `PUBLIC_CONTACT_WEBHOOK_URL` | Open: webhook URL needed |
| Hosting | Any static host | Open |
| Example figures | Time saved, revenue growth, per-service savings | Open: replace with real client results before launch |

## 1. Core positioning

- Headline: **Your Business, On Autopilot.**
- Supporting message: We design and build custom automations that eliminate repetitive work from your business.

Do not include:

- Login
- Dashboard
- Pricing plans
- Online payment
- Customer portal
- SaaS-style product pages

Do include:

- Strong visual storytelling
- Animations
- Automation examples
- Industry-specific use cases
- Consultation / contact form
- SEO landing pages
- Clear CTAs

## 2. Site architecture

```
workdoneai.com
├── /                         Homepage
├── /services
│   ├── /business-automation
│   ├── /whatsapp-automation
│   ├── /appointment-automation
│   ├── /crm-automation
│   ├── /ai-agents
│   └── /workflow-automation
├── /industries
│   ├── /healthcare
│   ├── /real-estate
│   ├── /restaurants
│   ├── /professional-services
│   └── /local-business
├── /about
├── /contact
├── /faq
├── /blog
├── /privacy
└── /terms
```

### Phases

| Phase | Scope |
| --- | --- |
| 1 | Homepage, Contact, Privacy, Terms |
| 2 | Service and industry pages |
| 3 | Blog / content marketing |

## 3. Navigation

```
Workdoneai       Services  Industries  How It Works  FAQ   [Let's Talk]
```

- Mobile: logo left, hamburger right.
- Sticky header.
- On scroll: slightly smaller, subtle border, subtle background blur, no excessive animation.

## 4. Homepage sections (in order)

1. Navbar
2. Hero
3. Stop Doing Work Your System Can Do
4. What We Automate
5. Automation Showcase
6. Before → After
7. How It Works
8. Industries
9. Integrations
10. Why Workdoneai
11. Consultation CTA
12. FAQ
13. Final CTA
14. Footer

### 4.1 Hero

A full-bleed hero photo with all text laid over it, on a dark gradient so white text stays readable.

- Small text above the headline: Leads · Bookings · Follow-ups · CRM · AI Agents
- Headline, very large (up to ~8.5rem): Your Business, **On Autopilot.** ("On Autopilot." in light lavender `#D5CFE1` on the photo)
- Supporting copy: We design and build custom automations that eliminate repetitive work from your business.
- Primary CTA: Let's Automate → (see open decisions)
- Secondary CTA: See How It Works ↓ (white outline)
- Photo idea: a business owner relaxed at the front desk while enquiries are handled automatically.

#### Hero results strip

Four large numbers along the bottom of the hero, showing time saved and revenue growth.

| Value | Label |
| --- | --- |
| 45 min → < 1 min | to handle each enquiry, from first message to booking |
| 73 hrs | of manual work saved every month |
| +25% | revenue growth from faster replies and no missed leads |
| 24/7 | customers get an answer, even after hours |

All figures are examples for the wireframe.
Replace them with real client results before launch; do not publish a revenue claim without data behind it.

#### Workflow animation

The animated workflow diagram (dot travelling WhatsApp / New Lead → AI Agent → CRM / Calendar / Email → Completed) moves out of the hero into the Automation Showcase (4.4), where it runs per business.

### 4.2 Problem section

Heading: **Stop Doing Work Your System Can Do.**
Large animated text, each item struck with ×:

- Manually checking WhatsApp
- Copying customer information
- Sending appointment reminders
- Updating your CRM
- Following up with leads
- Creating repetitive reports

Then transition: ↓ WORKDONEAI ↓ Automatically handled.
The animation turns the manual list into automated workflows.

### 4.3 What We Automate

A full-width carousel that runs edge to edge: cards start at the page margin and continue past the right edge of the screen.

- Each card: a large image with the service name as overlay text, its flow as chips, and a "Saves [X hrs / week]" line.
- Navigation: previous / next arrows, a "01 / 06" counter, a progress bar, plus drag and swipe.
- Cards already passed dim slightly.

| Card | Flow |
| --- | --- |
| Lead Automation | Capture → Qualify → Assign → Follow-up |
| WhatsApp Automation | Message → Understand → Respond → Act |
| Appointment Automation | Request → Availability → Booking → Reminder |
| CRM Automation | Lead → Update → Assign → Follow-up |
| AI Agents | Understand → Decide → Execute |
| Business Workflows | Trigger → Process → Connect → Complete |

### 4.4 Automation Showcase

Heading: **See automation in action.** (very large, second line in `--ink`)
Intro: Pick a business and watch one enquiry run from first message to done.
One of the strongest sections; front-end only, no backend.

Layout:

- Left: a large serif list of businesses (01 Doctor, 02 Real Estate, 03 Restaurant); the active one is highlighted with an arrow.
- Right: a lavender panel where the selected workflow runs left to right, the dot travelling node to node.
- Under the flow: Manual time, Automated time and the Result.

| Business | Workflow | Manual | Automated | Result |
| --- | --- | --- | --- | --- |
| Doctor | Patient → WhatsApp → AI Assistant → Check Availability → Book Appointment → Confirmation → Reminder | 40 min | 30 sec | Appointment booked, confirmed and reminded |
| Real Estate | Website / WhatsApp → New Lead → AI Qualifies → CRM → Notify Agent → Follow-up | 35 min | 20 sec | Lead qualified, in the CRM, agent notified |
| Restaurant | Customer Message → AI Assistant → Reservation → Calendar → Confirmation → Reminder | 15 min | 10 sec | Table reserved, confirmed and reminded |

Times are examples until real client data exists.

### 4.5 Before → After

Heading: **From Manual Work to Automated Flow**
Split screen, center label: **Less Work. More Flow.**

| Before | After |
| --- | --- |
| New enquiry | New enquiry |
| Someone checks message | Automation |
| Copies details | AI responds |
| Updates spreadsheet | CRM updated |
| Calls customer | Calendar checked |
| Checks availability | Appointment booked |
| Books appointment | Confirmation sent |
| Sends confirmation | |

#### Time saved

Each step shows how long it takes, so the difference is visible at a glance.

| Before step | Time | After step | Time |
| --- | --- | --- | --- |
| New enquiry | waits ~2 hrs | New enquiry | instant |
| Someone checks message | 5 min | Automation | 1 sec |
| Copies details | 5 min | AI responds | 5 sec |
| Updates spreadsheet | 5 min | CRM updated | 1 sec |
| Calls customer | 10 min | Calendar checked | 1 sec |
| Checks availability | 5 min | Appointment booked | 2 sec |
| Books appointment | 10 min | Confirmation sent | 1 sec |
| Sends confirmation | 5 min | | |
| **Total per enquiry** | **45 min** | **Total per enquiry** | **< 1 min** |

Below the two columns: a large "73 hrs saved every month" statement with two bars (manual 75 hrs vs automated ~2 hrs at 100 enquiries a month).
These numbers are examples only; replace them with real measurements from client projects before launch.

### 4.6 How It Works

Heading: **Simple for You. Powerful Behind the Scenes.**
Horizontal animated timeline on desktop, vertical on mobile.

1. **Discover** - We understand how your business works today.
2. **Design** - We identify repetitive processes and design the automation.
3. **Build** - We connect your tools and build the workflow.
4. **Launch** - We test, deploy, monitor, and improve.

### 4.7 Industries

Heading: **Built Around Your Business.**
Show that each workflow is customized, not identical everywhere.
Presented as a full-width carousel: one large photo slide per industry with the industry name in very large overlay text, its examples, and a "typical saving" figure.
Navigation: previous / next arrows, industry pills, swipe and drag on touch.

| Industry | Examples |
| --- | --- |
| Healthcare | Appointment booking, reminders, enquiries |
| Real Estate | Lead qualification, property enquiries, follow-ups |
| Restaurants | Reservations, customer enquiries, notifications |
| Professional Services | Lead intake, scheduling, documents, follow-ups |
| Local Businesses | Bookings, enquiries, reminders, reviews |
| E-commerce | Customer communication, order notifications, support workflows |

CTA: Explore Your Industry →

### 4.8 Integrations

Heading: **Your Tools. Your Process. One Automated Workflow.**
Workdoneai in the center, animated lavender lines connecting to tool logos.

Candidate tools: WhatsApp, Google Calendar, Gmail, Slack, Telegram, Google Sheets, HubSpot, Salesforce, Notion, n8n.

Rule: do not list an integration until it is actually supported.

### 4.9 Why Workdoneai

Heading: **Not Another Tool. A System Built Around Your Business.**

- **Custom** - Your automation is designed around your actual workflow.
- **Connected** - We connect the tools you're already using.
- **Practical** - We focus on removing real repetitive work.
- **Scalable** - Start with one workflow and expand as your business grows.

### 4.10 Consultation CTA

Primary conversion section.

- Heading: **Tell Us What Takes Too Much Time.**
- Copy: Describe the repetitive process that's slowing your business down. We'll help you identify what can be automated.
- Primary button: Let's Automate →
- Secondary button: Describe My Workflow

### 4.11 Contact form

Heading: Let's talk about your workflow.
Keep it short; the goal is to start a conversation, not run discovery through a form.

| Field | Type |
| --- | --- |
| Name | Text |
| Business Name | Text |
| Email / WhatsApp | Text |
| What does your business do? | Text |
| What would you like to automate? | Textarea |

Submit: Send Request →

### 4.12 FAQ

Accordion, concise answers, with FAQPage structured data.

1. What is business automation?
2. What type of business processes can Workdoneai automate?
3. Can you automate WhatsApp?
4. Can you automate appointment booking?
5. Can you connect my existing CRM?
6. Do I need to change my existing software?
7. Can you build AI agents?
8. How long does an automation take?
9. How much does automation cost?
10. Do you provide ongoing support?
11. Can you automate a custom process?
12. How do I get started?

### 4.13 Final CTA

Visually strong, Lavender `#D5CFE1` background with dark text and a Lavender Grey `#A09ABC` button.

- **Less Manual Work.**
- **More Time for What Matters.**
- Copy: Tell us what your team does manually. We'll show you what can be automated.
- Button: Let's Automate →

### 4.14 Footer

- WORKDONEAI
- Your Business, On Autopilot.
- Links: Services, Industries, How It Works, FAQ, Contact, Privacy Policy, Terms
- © 2026 Workdoneai. All rights reserved.

## 5. Visual system

### Brand palette

| Token | Name | Hex | Use |
| --- | --- | --- | --- |
| `--lavender-grey` | Lavender Grey | `#A09ABC` | Primary brand color: workflow lines, animated dot, primary button fill (with dark text), highlights |
| `--lilac` | Lilac | `#B6A6CA` | Secondary accent: hover states, active showcase tab, node fills |
| `--lavender` | Lavender | `#D5CFE1` | Section backgrounds, card fills, Final CTA background |
| `--lavender-light` | Lavender (light) | `#E1DEE9` | Page background tint, alternating sections, borders |
| `--almond-silk` | Almond Silk | `#D4BEBE` | Warm accent used sparingly: "Before" / manual side, problem-section × marks |

### Neutrals and supporting tokens

The five brand colors are all light pastels, so they cannot carry text or thin lines on their own.
These supporting tokens are kept for readability and are not part of the brand palette.

| Token | Hex | Use |
| --- | --- | --- |
| `--white` | `#FFFFFF` | Cards, page background |
| `--text` | `#171717` | Body text and headings |
| `--text-muted` | `#737373` | Secondary text |
| `--ink` | `#4A4370` (proposed) | Deep lavender for links, the "On Autopilot." highlight, focus rings, and flow lines that must stay visible |

### Contrast rules (WCAG AA)

| Pair | Ratio | Verdict |
| --- | --- | --- |
| `#171717` text on `#A09ABC` | 6.7 : 1 | OK for buttons and text |
| `#171717` text on `#D5CFE1` | 11.8 : 1 | OK |
| White text on `#A09ABC` | 2.7 : 1 | Fails, never use white text on brand colors |
| `#A09ABC` line or dot on white | 2.7 : 1 | Below the 3 : 1 needed for meaningful graphics, so pair it with `--ink` outlines or use `--ink` for the line |
| `--ink` `#4A4370` on white | 9.0 : 1 | OK for text, links and lines |

Identity: clean white interface + soft lavender automation flows + concise business messaging.
Define these once as CSS custom properties in a global stylesheet so every component uses the same tokens.

### Typography

Direction: large, editorial serif headlines with a quiet sans-serif for body text.
References: [Kinsley demo](https://kinsley-fluid-demo.squarespace.com/) and the Common Tongue screenshots.

| Role | Font | Source |
| --- | --- | --- |
| Headings, large statements, nav, logo wordmark | P22 Mackinac Pro, Regular 400 (Book) | Adobe Fonts (P22 Type Foundry) |
| Body, buttons, labels, form fields | Inter | Self-hosted |

Notes:

- The Kinsley demo uses exactly this pairing: P22 Mackinac Pro via Adobe Fonts for headings, Inter for body.
- P22 Mackinac Pro is a commercial font. It ships in four weights with italics and is licensed through an Adobe Fonts web project, which needs an Adobe Creative Cloud subscription.
- Adobe Fonts are served from Adobe's CDN (`use.typekit.net`) and cannot be self-hosted. That is an exception to the "self-host fonts" rule in sections 10 and 11; mitigate with `preconnect` and `font-display: swap`.
- Headings stay at weight 400; size, not boldness, creates hierarchy.

#### Type scale

Based on the Kinsley demo's values, made fluid with `clamp()` so it scales down on mobile.

| Token | Use | Desktop | Mobile | Line height | Letter spacing |
| --- | --- | --- | --- | --- | --- |
| `--display` | Hero headline, big statement blocks | 5.6rem (~90px) | 3rem | 1.05 | -0.03em |
| `--h2` | Section headings | 3.2rem | 2.25rem | 1.15 | -0.03em |
| `--h3` | Card titles, step titles | 2.5rem | 1.75rem | 1.2 | -0.02em |
| `--h4` | Small headings, nav | 1.6rem | 1.25rem | 1.25 | -0.01em |
| `--lead` | Intro paragraphs | 1.25rem | 1.125rem | 1.45 | 0 |
| `--body` | Body copy | 1rem | 1rem | 1.5 | 0 |
| `--small` | Labels, meta | 0.875rem | 0.875rem | 1.4 | 0.01em |

#### Patterns taken from the references

- Two-tone headlines: first sentence in `--text`, continuation in a muted tone, e.g. "Your Business, *On Autopilot.*" with the second part in `--ink` or `--lavender-grey` on dark text.
- Full-width statement paragraphs set in `--h2` or `--display`, spanning most of the page width (the Kinsley "With Kinsley Prep..." block).
- Numbered rows with hairline dividers: Roman or two-digit numerals, title, then two text columns (the Common Tongue "How It Works" layout). Use this for section 4.6.
- Outlined, square-cornered buttons in the nav; solid buttons for main CTAs.
- Thin-line geometric icons on cards (the Kinsley card icons), drawn as SVG strokes so GSAP can animate them.

### Layout and imagery

- Large type and large images; generous whitespace, few elements per screen.
- Full-bleed or near-full-bleed images between text blocks, as in the Common Tongue hero.
- Hairline 1px dividers and bordered cards instead of shadows.
- Wide max-width (around 1440px) with large side padding; content grids of 12 columns.
- Images: real photography of people at work (clinic front desk, real estate agent, restaurant host) to make the before/after and industries sections human.
- Overlay text on images: very large serif text over full-width photos, with a dark gradient behind it so white text stays readable.
- Images are placeholders in the wireframe; real photos go into the final build.

## 6. Animation system (GSAP)

All motion is built with [GSAP](https://gsap.com/), which is now free for commercial use including its plugins.

| # | Name | Behaviour | GSAP tools |
| --- | --- | --- | --- |
| 1 | Flow | Lavender dot travels through workflow nodes | MotionPathPlugin, timeline |
| 2 | Connection | Lines draw themselves between systems | DrawSVGPlugin |
| 3 | Transformation | MANUAL → AUTOMATED | timeline, ScrollTrigger |
| 4 | Headlines | Large headings reveal line by line on scroll | SplitText, ScrollTrigger |
| 5 | Cards and images | Cards and large images enter subtly; images scale gently from 1.05 to 1 | ScrollTrigger |
| 6 | Pinned showcase | Showcase / How It Works can pin while steps advance on scroll | ScrollTrigger (pin, scrub) |
| 7 | Numbers | Only for genuine metrics, later | gsap.to on a counter |
| 8 | Hover | Cards lift slightly or their workflow line activates | gsap.to / quickTo |
| 9 | Smooth scroll | Inertia scrolling across the whole page; anchor links glide to sections | ScrollSmoother, ScrollToPlugin |
| 10 | Image bands | Full-width photos scale from 1.1 to 1 and move slightly slower than the overlay text | ScrollTrigger (scrub) |
| 11 | Carousel | Industries slides crossfade, image scales in, title rises; drag and swipe with momentum | timeline, Draggable, InertiaPlugin |
| 12 | Time saved | Step times tick in, totals and hours-saved count up, bars grow from zero | ScrollTrigger, gsap.to on counters |

Rules:

- Avoid: excessive parallax, huge 3D objects, constantly moving backgrounds, heavy video, slow page transitions.
- Wrap every animation in `gsap.matchMedia()` so `prefers-reduced-motion: reduce` gets static, fully visible content.
- Content must be visible without JavaScript; animations only enhance it.
- Register only the plugins a page uses, and load GSAP from the npm package so Astro bundles it.
- Use one shared easing and duration set (e.g. `power3.out`, 0.8s) so motion feels consistent.

## 7. Brand voice

| Trait | Example |
| --- | --- |
| Clear | We automate repetitive business processes. |
| Confident | Your team shouldn't spend hours doing work software can handle. |
| Technical | We connect your tools, APIs, workflows, and AI systems. |
| Human | We build around how your business actually works. |

Avoid generic AI-agency language, for example "Revolutionize your business with cutting-edge AI-powered solutions" or "Unlock unprecedented synergies through intelligent automation".
Use simple language.

## 8. Core story

Your business → manual work → Workdoneai → automation + AI → simple workflow → more time, less manual work.
Every section should reflect this visually.
Show automation happening rather than explaining it with text.

## 9. SEO strategy

### Homepage

- Primary keyword: business automation services
- Secondary: business automation, workflow automation, custom business automation, business process automation, AI automation services, automation for small businesses
- No keyword stuffing.

### Service pages (Phase 2)

Each service page contains: H1, Problem, Solution, Use cases, Workflow animation, Benefits, How it works, FAQ, CTA.

### Industry pages (Phase 2+)

- `/industries/healthcare`, `/industries/real-estate`, `/industries/restaurants`, `/industries/professional-services`, `/industries/local-business`
- Later long-tail pages, for example `/healthcare/appointment-automation`, `/real-estate/lead-automation`, `/restaurant/whatsapp-automation`

### Blog (Phase 3)

Write about real business problems, not generic AI articles.

- How to Automate Doctor Appointment Booking Through WhatsApp
- How to Automatically Qualify Real Estate Leads
- How Restaurants Can Automate Customer Reservations
- 10 Business Processes You Should Automate
- What Is Business Process Automation?
- How Much Does Business Automation Cost?
- n8n vs Zapier for Small Business Automation

## 10. Technical stack (as built)

| Concern | Implementation |
| --- | --- |
| Framework | Astro 7, static output, one `.astro` page per route |
| Styling | Tailwind CSS 4 via `@tailwindcss/vite`; palette, fonts and fluid type scale as `@theme` tokens in `src/styles/global.css` |
| Fonts | Inter and Newsreader, self-hosted through Fontsource; Newsreader stands in for P22 Mackinac Pro |
| Animation | GSAP 3: ScrollTrigger, SplitText, ScrollSmoother, ScrollToPlugin |
| Carousels | Native CSS scroll-snap with arrow buttons, counter, progress bar and mouse drag |
| SEO | Shared `SEO.astro` (title, description, canonical, Open Graph), Organization and FAQPage JSON-LD |
| Sitemap / robots | `@astrojs/sitemap` (official Astro integration), `public/robots.txt` |
| Images | `ImageSlot.astro` renders labelled placeholders now and `astro:assets` `<Image>` once real photos are added |
| Contact form | Client-side JSON POST to an n8n webhook, with honeypot and status messages |

Two deviations from section 6:

- Carousels use native scroll-snap instead of GSAP Draggable + Inertia: swiping feels native on phones, works without JavaScript and needs no extra plugins.
- ScrollSmoother runs only on desktop pointers; touch devices keep native scrolling, which is smoother and more reliable there.

### Structure

```
src/
├── data/site.ts                  all homepage copy and figures
├── layouts/BaseLayout.astro      head, SEO, header, footer, smooth-scroll wrapper
├── layouts/LegalLayout.astro     privacy / terms
├── components/
│   ├── Header.astro, Footer.astro, MobileCta.astro, SEO.astro, ContactForm.astro
│   ├── ui/                       ImageSlot, Icon, CarouselControls
│   └── sections/                 Hero, Problem, Services, Showcase, BeforeAfter, HowItWorks,
│                                 Industries, Integrations, WhyUs, Consultation, Faq, FinalCta
├── pages/                        index, contact, privacy, terms, 404
├── scripts/                      motion, smooth-scroll, reveal, carousel, showcase, header,
│                                 mobile-menu, mobile-cta, contact-form
└── styles/global.css
```

### Mobile design

- Hero fills the screen (`100svh`) with stats in a 2 x 2 grid and full-width buttons.
- Full-screen menu with large serif links and the main CTA at thumb height.
- A "Let's Automate" bar appears after the hero and hides over the contact form and footer.
- Carousels swipe with snap points; the next card peeks in to show there is more.
- Showcase businesses become a row of pills; the workflow runs as a vertical timeline.
- Before / After and Why stack vertically; integrations wrap as centred chips.

## 11. Performance targets

| Lighthouse | Target |
| --- | --- |
| Performance | 90+ |
| Accessibility | 95+ |
| Best Practices | 95+ |
| SEO | 95+ |

- SVG illustrations
- GSAP animations on `transform` and `opacity` only, so they stay on the GPU
- Large images through `astro:assets` (AVIF/WebP, responsive `srcset`); the hero image is eager-loaded, the rest lazy-loaded
- Inter self-hosted and subset; Adobe Fonts with `preconnect`
- Minimal JavaScript beyond GSAP
- Not every section needs an animation.

## 12. Mobile experience

Do not just shrink the desktop layout.

- Hero: stacked headline ("YOUR BUSINESS, / ON AUTOPILOT."), short copy ("We automate the repetitive work behind your business."), CTA, then the workflow animation below.
- Services become vertical cards.
- Workflow diagrams become vertical.
- Before / After stacks vertically: Before (manual), then After (automated).
- CTA stays easy to reach.

## 13. Phase 1 checklist

- [ ] Resolve open decisions (section 0)
- [ ] Scaffold the Astro project with `site: 'https://workdoneai.com'`
- [ ] Global tokens, typography, base layout, header and footer
- [ ] Reusable workflow SVG component and hero animation
- [ ] Homepage sections 1-14 as Astro components
- [ ] Interactive Automation Showcase
- [ ] Contact form posting to the n8n webhook, with email notification
- [ ] FAQ accordion with FAQPage JSON-LD
- [ ] Privacy and Terms pages
- [ ] SEO component, `@astrojs/sitemap`, `robots.txt`
- [ ] `prefers-reduced-motion` support
- [ ] Mobile layouts for every section
- [ ] Lighthouse audit against the targets
