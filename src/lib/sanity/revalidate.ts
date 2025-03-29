import { SANITY_REVALIDATE_SECRET } from "astro:env/server";

export const SIGNATURE_HEADER_NAME = "sanity-webhook-signature" as const;

export async function isValidSignature(signature: string) {
  const secret = SANITY_REVALIDATE_SECRET;

  if (!secret) {
    throw new Error("SANITY_REVALIDATE_SECRET is not set");
  }

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
