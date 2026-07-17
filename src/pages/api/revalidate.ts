import type { APIRoute } from "astro";
import { SANITY_REVALIDATE_SECRET } from "astro:env/server";

import {
  currentProjection,
  getTagsFromBody,
  validateSignature,
} from "~/lib/sanity/revalidate";
import { tryCatch } from "~/lib/utils";

export const prerender = false;

export const POST: APIRoute = async (ctx) => {
  const validateSignatureRes = await tryCatch(
    validateSignature(ctx.request, SANITY_REVALIDATE_SECRET),
  );

  if (validateSignatureRes.success === false) {
    return new Response("Unable to validate signature", { status: 500 });
  }

  if (validateSignatureRes.data === null) {
    return new Response("No Signature found", { status: 401 });
  }

  if (validateSignatureRes.data === false) {
    return new Response("Invalid Signature", { status: 401 });
  }

  const body = await ctx.request.json();
  const parsed = currentProjection.safeParse(body);

  if (!parsed.success) {
    return new Response("Invalid body", { status: 400 });
  }

  const tags = getTagsFromBody(parsed.data);

  const revalidateRes = await tryCatch(ctx.cache.invalidate({ tags: tags }));

  if (!revalidateRes.success) {
    return new Response("Unable to revalidate tags", { status: 500 });
  }

  return new Response("Revalidated tags", { status: 200 });
};
