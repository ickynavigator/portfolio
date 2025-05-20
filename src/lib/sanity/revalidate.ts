import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";

import { getEnv } from "~/lib/env";

export async function validateSignature(req: Request) {
  const env = getEnv();

  const signature = req.headers.get(SIGNATURE_HEADER_NAME);
  const stringifiedPayload = await req.text();

  if (!signature) {
    return null;
  }

  return await isValidSignature(
    stringifiedPayload,
    signature,
    env.SANITY_REVALIDATE_SECRET,
  );
}
