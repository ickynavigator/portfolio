import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { SANITY_REVALIDATE_SECRET } from "astro:env/server";

export async function validateSignature(_req: Request) {
  const req = _req.clone();

  const signature = req.headers.get(SIGNATURE_HEADER_NAME);
  if (!signature) {
    return null;
  }

  const stringifiedPayload = await req.text();

  return await isValidSignature(
    stringifiedPayload,
    signature,
    SANITY_REVALIDATE_SECRET,
  );
}
