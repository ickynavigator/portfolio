import type { APIRoute } from "astro";

import { revalidateTag } from "~/lib/cloudflare";
import { validateSignature } from "~/lib/sanity/revalidate";
import { tryCatch } from "~/lib/utils";

export const prerender = false;

export const POST: APIRoute = async (ctx) => {
  const validateSignatureRes = await tryCatch(validateSignature(ctx.request));

  if (validateSignatureRes.success === false) {
    return new Response("Unable to validate signature", { status: 500 });
  }

  if (validateSignatureRes.data === null) {
    return new Response("No Signature found", { status: 401 });
  }

  if (validateSignatureRes.data === false) {
    return new Response("Invalid Signature", { status: 401 });
  }

  const revalidateRes = await tryCatch(revalidateTag(["hi"]));

  if (!revalidateRes.success) {
    return new Response("Unable to revalidate tags", { status: 500 });
  }

  return new Response("Revalidated tags", { status: 200 });
};
