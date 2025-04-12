import { IconBubbleText, IconSend, IconX } from "@tabler/icons-react";
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

const usePartyMessages = () => {
  const [realMessages, setMessages] = useState<
    {
      type: string;
      content: string;
      sending?: boolean;
    }[]
  >([
    {
      type: "announcement",
      content: "Hi, how can I help you today?",
    },
    {
      type: "message",
      content: "Hey, I'm having trouble with my account.",
    },
    {
      type: "announcement",
      content: "What seems to be the problem?",
    },
    {
      type: "message",
      content: "I can't log in.",
    },
  ]);

  const [messages, addOptimisticMessage] = useOptimistic(
    realMessages,
    (state, newMessage: string) => [
      ...state,
      { type: "message", content: newMessage, sending: true },
    ],
  );

  const addMessage = (message: string) => {
    setMessages((prev) => [...prev, { type: "message", content: message }]);
  };

  const sendMessage = async (message: string) => {
    try {
      addOptimisticMessage(message);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      addMessage(message);
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
    <div className="no-js fixed right-15 bottom-15 z-100">
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
        <Card className="max-h-[60svh] w-sm max-w-full">
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
