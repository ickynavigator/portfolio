import { IconBubbleText, IconSend, IconX } from "@tabler/icons-react";
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
import { getEnv } from "~/lib/env";
import { cn } from "~/lib/utils";
import Transport, { MESSAGE_TYPES } from "~/t/party/transport";

const transport = new Transport();

interface Message {
  type: MESSAGE_TYPES;
  content: string;
  sending?: boolean;
}

const usePartyMessages = () => {
  const PS = usePartySocket({
    host: getEnv().PUBLIC_PARTY_URL,
    room: "my-room",
    onMessage(e) {
      console.log("Message received", e.data);
      transport.match(e.data, {
        bulk: (data) => {
          setMessages((prev) =>
            prev.concat(
              data.messages.map((message) => ({
                type: message.type,
                content: message.message,
              })),
            ),
          );
        },
        message: (data) => {
          addRealMessage(data.message, MESSAGE_TYPES.message);
        },
      });
    },
  });

  const [realMessages, setMessages] = useState<Message[]>([]);

  const [messages, addOptimisticMessage] = useOptimistic(
    realMessages,
    (state, newMessage: string) => [
      ...state,
      { type: MESSAGE_TYPES.message, content: newMessage, sending: true },
    ],
  );

  const addRealMessage = (message: string, type: MESSAGE_TYPES) => {
    setMessages((prev) => [...prev, { type: type, content: message }]);
  };

  const sendMessage = async (message: string) => {
    try {
      addOptimisticMessage(message);

      PS.send(
        transport.encode(
          transport.tag("message", { timestamp: Date.now(), message }),
        ),
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

const Party = () => {
  const { messages, sendMessage } = usePartyMessages();

  const [isPending, startTransition] = useTransition();

  const bottomRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    startTransition(async () => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);
      const formObject = Object.fromEntries(formData);
      const parsed = schema.safeParse(formObject);

      if (!parsed.success) {
        console.error(parsed.error.errors);
        return;
      }

      try {
        await sendMessage(parsed.data.message);

        formRef.current?.reset();
      } catch (error) {
        console.error("Error sending message:", error);
      }
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
        className="size-15 rounded-full [anchor-name:--party-dialog]"
        onClick={openDialog}
      >
        <IconBubbleText className="size-7/10" />
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
                    "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm break-words transition-opacity",
                    message.sending && "opacity-50",
                    message.type === "message"
                      ? "bg-primary text-primary-foreground ml-auto"
                      : "bg-muted",
                  )}
                >
                  {message.content}
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
};

export default Party;
