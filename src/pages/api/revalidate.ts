import type { APIRoute } from "astro";

import { revalidateTag } from "~/lib/cloudflare";
import { getPostHogInstance } from "~/lib/posthog/node";
import { validateSignature } from "~/lib/sanity/revalidate";
import { tryCatch } from "~/lib/utils";

export const prerender = false;

export const POST: APIRoute = async (ctx) => {
  const posthogInstance = getPostHogInstance();
  const { posthog } = posthogInstance;

  const validateSignatureRes = await tryCatch(validateSignature(ctx.request));

  if (validateSignatureRes.success === false) {
    posthog.capture({
      distinctId: "error",
      event: "signature_validation_error",
      properties: { error: validateSignatureRes.error },
    });
    return new Response("Unable to validate signature", { status: 500 });
  }

  if (validateSignatureRes.data == null) {
    posthog.capture({
      distinctId: "error",
      event: "signature_validation_error",
      properties: { error: "No signature found" },
    });
    return new Response("No Signature found", { status: 401 });
  }

  if (validateSignatureRes.data === false) {
    posthog.capture({
      distinctId: "error",
      event: "signature_validation_error",
      properties: { error: "Invalid Signature" },
    });
    return new Response("Invalid Signature", { status: 401 });
  }

  const TAGS = ["hi"];
  const revalidateRes = await tryCatch(revalidateTag(TAGS));

  if (!revalidateRes.success) {
    posthog.capture({
      distinctId: "error",
      event: "revalidate_error",
      properties: { error: revalidateRes.error },
    });
    return new Response("Unable to revalidate tags", { status: 500 });
  }

  posthog.capture({
    distinctId: "success",
    event: "revalidate_success",
    properties: { tags: TAGS, result: revalidateRes.data },
  });
  return new Response("Revalidated tags", { status: 200 });
};
