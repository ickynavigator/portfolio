import Cloudflare from "cloudflare";

import { getEnv } from "~/lib/env";

export function getCloudflareInstance() {
  const env = getEnv();

  const cloudflare = new Cloudflare({ apiToken: env?.CF_API_TOKEN });

  return {
    cloudflare,
  };
}

export async function revalidateTag(tags: string[]) {
  const env = getEnv();
  const c = getCloudflareInstance();

  return await c.cloudflare.cache.purge({
    zone_id: env.CF_ZONE_ID,
    tags: tags,
  });
}
