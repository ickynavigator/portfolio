import { CLOUDFLARE_API_TOKEN, CLOUDFLARE_ZONE_ID } from "astro:env/client";
import Cloudflare from "cloudflare";

export function createCloudflareInstance() {
  const cloudflare = new Cloudflare({ apiToken: CLOUDFLARE_API_TOKEN });

  return {
    cloudflare,
  };
}

export async function revalidateTag(tags: string[]) {
  const c = createCloudflareInstance();

  if (!CLOUDFLARE_ZONE_ID) {
    throw new Error("CLOUDFLARE_ZONE_ID is not set");
  }

  return await c.cloudflare.cache.purge({
    zone_id: CLOUDFLARE_ZONE_ID,
    tags: tags,
  });
}
