import { createEnv } from '@t3-oss/env-nextjs';
import { vercel } from '@t3-oss/env-nextjs/presets';
import { z } from 'zod';
import { sanity } from '~/lib/sanity/env.preset';

const base = () => {
  return createEnv({
    client: {},
    server: {},
    shared: {
      NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
      TZ: z.string().optional(),
    },
    runtimeEnv: {
      NODE_ENV: process.env.NODE_ENV,
      TZ: process.env.TZ,
    },
  });
};

const env = createEnv({
  client: {
    NEXT_PUBLIC_SANITY_API_VERSION: z.string().default('2024-04-03'),
    NEXT_PUBLIC_SITE_URL: z.string().min(1).default('localhost:3000'),
  },
  server: {},
  shared: {},
  extends: [vercel(), sanity(), base()],
  experimental__runtimeEnv: {
    NEXT_PUBLIC_SANITY_API_VERSION: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },
});

export default env;
