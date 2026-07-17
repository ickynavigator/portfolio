import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import z from "zod";

export async function validateSignature(_req: Request, againstSecret: string) {
  const req = _req.clone();

  const signature = req.headers.get(SIGNATURE_HEADER_NAME);
  if (!signature) {
    return null;
  }

  const stringifiedPayload = await req.text();

  return await isValidSignature(stringifiedPayload, signature, againstSecret);
}

export const currentProjection = z.object({
  _id: z.string(),
  _type: z.string(),
});

export const getTagsFromBody = (
  body: Partial<z.infer<typeof currentProjection>>,
) => {
  const tags = [];

  if (body._type) {
    tags.push(`_type:${body._type}`);
  }

  if (body._id) {
    tags.push(`_id:${body._id}`);
  }

  if (body._type && body._id) {
    tags.push(`_type:${body._type}&_id:${body._id}`);
  }

  return tags;
};

export const MAX_AGE = 120; // seconds
export const SWR = 60; // seconds
