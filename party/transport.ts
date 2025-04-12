import { z } from "zod";

const stringToJSONSchema = z.string().transform((value, ctx) => {
  try {
    return JSON.parse(value);
  } catch {
    ctx.addIssue({ code: "custom", message: "Invalid JSON" });
    return z.NEVER;
  }
});

const JSONToStringSchema = z.any().transform((value, ctx) => {
  try {
    return JSON.stringify(value);
  } catch {
    ctx.addIssue({ code: "custom", message: "Invalid JSON" });
    return z.NEVER;
  }
});

export const MESSAGE_TYPES = {
  announcement: "announcement",
} as const;
export type MESSAGE_TYPES = (typeof MESSAGE_TYPES)[keyof typeof MESSAGE_TYPES];

const SCHEMAS = {
  announcement: z.object({
    type: z.literal(MESSAGE_TYPES.announcement),
    timestamp: z.number(),
    message: z.string(),
  }),
} as const;

const COMBINED_SCHEMA = z.discriminatedUnion("type", [SCHEMAS.announcement]);

export class Transport {
  tag<Tag extends keyof TransportTypes>(
    type: Tag,
    data: Omit<TransportTypes[Tag], "type">,
  ) {
    const tagged = SCHEMAS[type].parse({ type, ...data });

    return tagged as TransportTypes[Tag];
  }

  encode(data: unknown) {
    const parsed = JSONToStringSchema.parse(data);
    return parsed;
  }

  decode<T extends z.ZodTypeAny>(data: unknown, schema: T) {
    const parsed = stringToJSONSchema.pipe(schema).parse(data);
    return parsed as z.infer<T>;
  }

  match(data: string, cbs: Match) {
    const parsed = this.decode(data, COMBINED_SCHEMA);

    type ParsedType = Extract<TransportTypes, { type: typeof parsed.type }>;
    cbs[parsed.type]?.(parsed as ParsedType);
  }
}
type RecordOfZod = Record<string, z.ZodTypeAny>;
type ZodWithLiteralType = z.ZodObject<{ type: z.ZodLiteral<string> }>;

type Match = _Match<_Combined<typeof SCHEMAS>>;
type TransportTypes = _Unwrapped<typeof SCHEMAS>;
type _Unwrapped<T extends RecordOfZod> = { [K in keyof T]: z.infer<T[K]> };
type _Combined<T extends RecordOfZod> = { [K in keyof T]: T[K] }[keyof T];
type _Match<T extends ZodWithLiteralType> = {
  [K in z.infer<T>["type"]]?: (data: Extract<z.infer<T>, { type: K }>) => void;
};

export default Transport;
