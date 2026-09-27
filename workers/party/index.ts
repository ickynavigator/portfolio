import {
  routePartykitRequest,
  Server,
  type Connection,
  type ConnectionContext,
  type WSMessage,
} from "partyserver";

import { MESSAGE_TYPES, transport } from "~/w/party/transport.in-use";

export class MyPartyServer extends Server {
  override async onConnect(conn: Connection, ctx: ConnectionContext) {
    console.log(
      `Connected:
id:     ${conn.id}
room:   ${this.name}
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

  override async onMessage(connection: Connection, message: WSMessage) {
    console.log(
      `Connection [Message]: 
id:      ${connection.id}
message: ${message}`,
    );

    this.broadcast(message);
    await this.messages.add(message);
  }

  get messages() {
    const key = MESSAGE_TYPES.message;

    return {
      get: async () => {
        const msgs = await this.ctx.storage.get<string[]>(key);
        return msgs ?? [];
      },
      add: async (_message: WSMessage) => {
        const message = decodeWsMessage(_message);
        const msgs = (await this.messages.get()).push(message);
        await this.ctx.storage.put(key, msgs);
      },
    };
  }
}

function decodeWsMessage(message: WSMessage) {
  if (message instanceof ArrayBuffer) {
    return new TextDecoder().decode(new Uint8Array(message));
  }
  return message.toString();
}

export default {
  async fetch(request: Request, env) {
    return (
      (await routePartykitRequest(request, env)) ||
      new Response("Not Found", { status: 404 })
    );
  },
} satisfies ExportedHandler<Env>;
