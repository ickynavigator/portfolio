import * as z from "zod";

import Transport from "~/t/party/transport";

export const MESSAGE_TYPES = {
  message: "message",
  bulk: "bulk",
} as const;

export type TMESSAGE_TYPES = (typeof MESSAGE_TYPES)[keyof typeof MESSAGE_TYPES];

const MessageSchema = z.object({
  type: z.literal(MESSAGE_TYPES.message),
  timestamp: z.number(),
  message: z.string(),
});

const BulkSchema = z.object({
  type: z.literal(MESSAGE_TYPES.bulk),
  messages: z.array(MessageSchema),
});

export const transport = new Transport({
  discriminant: "type",
  schemaUnion: [MessageSchema, BulkSchema],
});
