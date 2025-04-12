import type * as Party from "partykit/server";

import Transport from "~/t/party/transport";

const transport = new Transport();

const MESSAGE_KEY = "messages";
export default class Server implements Party.Server {
  messages: string[] = [];

  constructor(readonly party: Party.Room) {}

  async onStart() {
    this.messages = (await this.party.storage.get<string[]>(MESSAGE_KEY)) ?? [];
  }

  async onConnect(conn: Party.Connection, ctx: Party.ConnectionContext) {
    console.log(
      `Connected:
id:     ${conn.id}
room:   ${this.party.id}
url:    ${new URL(ctx.request.url).pathname}`,
    );

    conn.send(
      transport.encode(
        transport.tag("bulk", {
          messages: this.messages.map((message) =>
            transport.decode(message, Transport.SCHEMAS.message),
          ),
        }),
      ),
    );
  }

  async onMessage(message: string, sender: Party.Connection) {
    console.log(
      `Connection [Message]: 
id:      ${sender.id}
message: ${message}`,
    );

    this.party.broadcast(message);

    this.messages.push(message);
    await this.party.storage.put(MESSAGE_KEY, this.messages);
  }
}

Server satisfies Party.Worker;
