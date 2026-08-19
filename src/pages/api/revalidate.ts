import type { APIRoute } from "astro";
import { SANITY_REVALIDATE_SECRET } from "astro:env/server";

import {
  currentProjection,
  getTagsFromBody,
  validateSignature,
} from "~/lib/sanity/revalidate";

export const prerender = false;

export const POST: APIRoute = async (ctx) => {
  try {
    const validateSignatureRes = await validateSignature(
      ctx.request,
      SANITY_REVALIDATE_SECRET,
    );
    if (validateSignatureRes === null) {
      return new Response("No Signature found", { status: 401 });
    }
    if (validateSignatureRes === false) {
      return new Response("Invalid Signature", { status: 401 });
    }
  } catch {
    return new Response("Unable to validate signature", { status: 500 });
  }

  const body = await ctx.request.json();
  const parsed = currentProjection.safeParse(body);

  if (!parsed.success) {
    return new Response("Invalid body", { status: 400 });
  }

  const tags = getTagsFromBody(parsed.data);

  try {
    ctx.cache.invalidate({ tags: tags });
  } catch {
    return new Response("Unable to revalidate tags", { status: 500 });
  }

  return new Response("Revalidated tags", { status: 200 });
};
