// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://giraycoskun.com',
  image: {
    domains: ['images.unsplash.com'],
    remotePatterns: [{
      protocol: 'https',
      hostname: 'images.unsplash.com',
    }],
  },
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react()]
});