import { env } from "cloudflare:workers";
import { getUserPlayedGames } from "psn-api";

export async function getPSNStats() {
  const authorization = await env.PSN_AUTH.getByName("psn").getAuthorization();
  const title = await getUserPlayedGames(authorization, "me", {
    limit: 16,
    offset: 0,
    categories: "ps4_game,ps5_native_game",
  });
  return {
    recentlyPlayed: title.titles,
  };
}
