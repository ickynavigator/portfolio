import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

/**
 * Sanity System Environment Variables - Provided by Sanity's Vercel Integration
 * @see https://www.sanity.io/docs/vercel-integration#c1159d98072b
 */
export const sanity = () => {
  return createEnv({
    client: {
      NEXT_PUBLIC_SANITY_PROJECT_ID: z.string(),

      NEXT_PUBLIC_SANITY_DATASET: z.string().default('production'),
    },
    server: {
      SANITY_API_PROJECT_ID: z.string(),
      SANITY_STUDIO_PROJECT_ID: z.string(),

      SANITY_API_DATASET: z.string().default('production'),
      SANITY_STUDIO_DATASET: z.string().default('production'),

      SANITY_API_READ_TOKEN: z.string(),
      SANITY_API_WRITE_TOKEN: z.string(),
    },
    runtimeEnv: {
      SANITY_API_DATASET: process.env.SANITY_API_DATASET,
      SANITY_STUDIO_DATASET: process.env.SANITY_STUDIO_DATASET,
      NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,

      SANITY_API_PROJECT_ID: process.env.SANITY_API_PROJECT_ID,
      SANITY_STUDIO_PROJECT_ID: process.env.SANITY_STUDIO_PROJECT_ID,
      NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,

      SANITY_API_READ_TOKEN: process.env.SANITY_API_READ_TOKEN,
      SANITY_API_WRITE_TOKEN: process.env.SANITY_API_WRITE_TOKEN,
    },
  });
};
