import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

import sanity from '@sanity/astro';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  output: 'server',

  adapter: cloudflare({
    platformProxy: {
      enabled: true
    }
  }),

  integrations: [sanity(), react()]
});