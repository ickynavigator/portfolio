import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { SANITY_REVALIDATE_SECRET } from "astro:env/server";

export async function validateSignature(req: Request) {
  const signature = req.headers.get(SIGNATURE_HEADER_NAME);
  const stringifiedPayload = await req.json<string>();

  if (!signature) {
    return null;
  }

  if (!SANITY_REVALIDATE_SECRET) {
    throw new Error("SANITY_REVALIDATE_SECRET is not set");
  }

  return await isValidSignature(
    stringifiedPayload,
    signature,
    SANITY_REVALIDATE_SECRET,
  );
}
