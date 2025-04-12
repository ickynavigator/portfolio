import type * as Party from "partykit/server";

import Transport from "~/t/party/transport";

const transport = new Transport();

const partyMessage = (people: number) => {
  let message;

  switch (people) {
    case 0:
      message = `No one is here yet. Let's get this party started! 🎉`;
      break;
    case 1:
      message = `It's just you here, but that's still a party! 🎈`;
      break;
    default:
      message = `You're partying with ${people} people right now! 🎈`;
      break;
  }

  return transport.encode(
    transport.tag("announcement", { message, timestamp: Date.now() }),
  );
};

export default class Server implements Party.Server {
  people: number;

  constructor(readonly party: Party.Room) {
    this.people = 0;
  }

  onConnect(conn: Party.Connection, ctx: Party.ConnectionContext) {
    this.people += 1;

    console.log(
      `Connected:
id:     ${conn.id}
room:   ${this.party.id}
people: ${this.people}
url:    ${new URL(ctx.request.url).pathname}`,
    );

    this.party.broadcast(partyMessage(this.people), [conn.id]);
  }

  onClose(conn: Party.Connection) {
    this.people -= 1;

    console.log(
      `Disconnected:
id:     ${conn.id}
room:   ${this.party.id}
people: ${this.people}`,
    );

    this.party.broadcast(partyMessage(this.people));
  }
}

Server satisfies Party.Worker;
