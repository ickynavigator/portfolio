import { getEnv } from "../env";

export const SIGNATURE_HEADER_NAME = "sanity-webhook-signature" as const;

export async function isValidSignature(signature: string) {
  const env = getEnv();

  const secret = env.SANITY_REVALIDATE_SECRET;

  return secret === signature;
}

export async function validateSignature(req: Request) {
  const signature = req.headers.get(SIGNATURE_HEADER_NAME);

  if (!signature) {
    return null;
  }

  const validSignature = await isValidSignature(signature);

  return validSignature;
}
