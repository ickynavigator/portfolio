import { env } from "cloudflare:workers";
import { getUserPlayedGames } from "psn-api";

import { AuthorizationStore } from "~/durable/refresh-psn.utils";

export async function getPSNStats() {
  const authorization = await new AuthorizationStore(env).getOrThrow();
  const title = await getUserPlayedGames(authorization, "me", {
    limit: 10,
    offset: 0,
    categories: "ps4_game,ps5_native_game",
  });
  return {
    recentlyPlayed: title.titles,
  };
}
