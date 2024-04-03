import { createEnv } from '@t3-oss/env-nextjs';
import { vercel } from '@t3-oss/env-nextjs/presets';
import { z } from 'zod';

const env = createEnv({
  client: {
    NEXT_PUBLIC_SANITY_DATASET: z.string().default('production'),
    NEXT_PUBLIC_SANITY_PROJECT_ID: z.string(),
    NEXT_PUBLIC_SANITY_API_VERSION: z.string().default('2024-04-03'),
  },
  server: {},
  shared: {
    VERCEL_URL: z.string().min(1).default('localhost:3000'),
  },
  extends: [vercel],
  experimental__runtimeEnv: {
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_API_VERSION: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
    VERCEL_URL: process.env.VERCEL_URL,
  },
});

export default env;
