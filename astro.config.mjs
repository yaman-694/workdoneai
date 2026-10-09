// @ts-check
import { defineConfig, envField } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://workdoneai.com',
  // Pages stay static; only routes with `prerender = false` (the contact API) run as Vercel functions.
  adapter: vercel(),
  // Keep HTML whitespace semantics between inline elements.
  compressHTML: true,
  integrations: [sitemap()],
  env: {
    schema: {
      PUBLIC_TURNSTILE_SITE_KEY: envField.string({ context: 'client', access: 'public' }),
      TURNSTILE_SECRET_KEY: envField.string({ context: 'server', access: 'secret' }),
      CONTACT_WEBHOOK_URL: envField.string({ context: 'server', access: 'secret', url: true }),
      CONTACT_WEBHOOK_SECRET: envField.string({ context: 'server', access: 'secret', min: 32 }),
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
