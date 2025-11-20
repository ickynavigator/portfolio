import { IconMessageCircle, IconSend, IconX } from "@tabler/icons-react";
import { PUBLIC_PARTY_URL } from "astro:env/client";
import { usePartySocket } from "partysocket/react";
import { useOptimistic, useRef, useState, useTransition } from "react";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";
import {
  MESSAGE_TYPES,
  transport,
  type TMESSAGE_TYPES,
} from "~/t/party/transport.in-use";

interface Message {
  type: TMESSAGE_TYPES;
  message: string;
  sending?: boolean;
}

const usePartyMessages = () => {
  const [_messages, _setMessages] = useState<Message[]>([]);
  const [messages, addOptimisticMessage] = useOptimistic(
    _messages,
    (state, newMessage: string) => [
      ...state,
      { type: MESSAGE_TYPES.message, message: newMessage, sending: true },
    ],
  );

  const pushRealMessage = (messages: Message[], persist = true) => {
    _setMessages((prev) => {
      if (persist) {
        return [...prev, ...messages];
      }

      return messages;
    });
  };

  const PS = usePartySocket({
    host: PUBLIC_PARTY_URL,
    room: "my-room",
    onMessage(e) {
      const matcher = transport.match({
        bulk: ({ messages }) => {
          const _messages: Message[] = messages.map(({ type, message }) => ({
            type,
            message,
          }));

          pushRealMessage(_messages, false);
        },
        message: ({ message, type }) => {
          const _message: Message[] = [{ type, message }];

          pushRealMessage(_message);
        },
      });

      matcher(e.data);
    },
  });

  const sendMessage = async (message: string) => {
    try {
      addOptimisticMessage(message);

      PS.send(
        transport.tag("message", { timestamp: Date.now(), message }).encoded,
      );
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return { messages, sendMessage };
};

const schema = z.object({
  message: z.string().min(1, { message: "Message is required" }),
});
const formDataPreprocessor = (target: HTMLFormElement) => {
  const formData = new FormData(target);
  const formObject = Object.fromEntries(formData);
  return formObject;
};

export default function Party() {
  const { messages, sendMessage } = usePartyMessages();

  const [isPending, startTransition] = useTransition();

  const bottomRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    startTransition(async () => {
      event.preventDefault();

      const parsed = z
        .preprocess(formDataPreprocessor, schema)
        .safeDecode(event.currentTarget);

      if (!parsed.success) {
        console.error(z.prettifyError(parsed.error));
        return;
      }

      await sendMessage(parsed.data.message);
      formRef.current?.reset();
    });
  };

  const openDialog = () => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.show();
      inputRef.current?.focus();
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      dialogRef.current?.close();
    }
  };

  const closeDialog = () => {
    dialogRef.current?.close();
  };

  return (
    <div className="no-js fixed right-5 bottom-5 z-100">
      <Button
        variant="outline"
        size="icon"
        className="size-13 rounded-2xl [anchor-name:--party-dialog]"
        onClick={openDialog}
      >
        <IconMessageCircle className="size-7/10" />
      </Button>

      <dialog
        ref={dialogRef}
        className="absolute inset-auto right-[anchor(right)] bottom-[anchor(top)] mb-3 rounded-xl [position-anchor:--party-dialog]"
      >
        <Card className="max-h-[60svh] w-sm max-w-[90svw]">
          <CardHeader>
            <div className="flex flex-row items-center justify-between">
              <div>
                <p className="text-sm leading-none font-medium">Chatroom</p>
                <p className="text-muted-foreground text-sm">
                  Powered by{" "}
                  <a
                    href="https://www.partykit.io/"
                    target="_blank"
                    className="hover-link font-normal"
                  >
                    PartyKit
                  </a>
                </p>
              </div>

              <Button
                variant="outline"
                size="icon"
                className="ml-auto border"
                onClick={closeDialog}
              >
                <IconX />
                <span className="sr-only">Close</span>
              </Button>
            </div>
          </CardHeader>

          <CardContent className="overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  ref={(item) => {
                    item?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={cn(
                    "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm wrap-break-word transition-opacity",
                    message.sending && "opacity-50",
                    message.type === "message"
                      ? "bg-primary text-primary-foreground ml-auto"
                      : "bg-muted",
                  )}
                >
                  {message.message}
                </div>
              ))}
            </div>

            <span ref={bottomRef} />
          </CardContent>

          <CardFooter>
            <form
              ref={formRef}
              onSubmit={submitHandler}
              className="flex w-full items-center justify-between gap-2"
            >
              <Input
                ref={inputRef}
                id="message"
                name="message"
                placeholder="Type your message..."
                className="flex-1"
                autoComplete="off"
                minLength={1}
              />

              <Button type="submit" size="icon" disabled={isPending}>
                <IconSend />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </CardFooter>
        </Card>
      </dialog>
    </div>
  );
}
