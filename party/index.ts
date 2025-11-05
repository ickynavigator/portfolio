import type * as Party from "partykit/server";

import { MESSAGE_TYPES, transport } from "~/t/party/transport.in-use";

export default class Server implements Party.Server {
  constructor(readonly party: Party.Room) {}

  async onConnect(conn: Party.Connection, ctx: Party.ConnectionContext) {
    console.log(
      `Connected:
id:     ${conn.id}
room:   ${this.party.id}
url:    ${new URL(ctx.request.url).pathname}`,
    );

    conn.send(
      transport.tag("bulk", {
        messages: (await this.messages.get()).map(
          (message) =>
            transport.decodeByDiscriminant(message, "message").processed,
        ),
      }).encoded,
    );
  }

  async onMessage(message: string, sender: Party.Connection) {
    console.log(
      `Connection [Message]: 
id:      ${sender.id}
message: ${message}`,
    );

    this.party.broadcast(message);
    await this.messages.add(message);
  }

  get messages() {
    const key = MESSAGE_TYPES.message;

    return {
      get: async () => {
        const msgs = await this.party.storage.get<string[]>(key);
        return msgs ?? [];
      },
      add: async (message: string) => {
        const msgs = (await this.messages.get()).push(message);
        await this.party.storage.put(key, msgs);
      },
    };
  }
}

Server satisfies Party.Worker;
