import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://vutuancuong.vercel.app',
  i18n: {
    defaultLocale: "vi",
    locales: ["vi", "en"],
    routing: {
      prefixDefaultLocale: false
    }
  },
  devOptions: {
    port: 3000,
    tailwindConfig: './tailwind.config.js',
  },
  integrations: [react(), tailwind(), sitemap()],
});