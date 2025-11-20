import { PSN_NPSSO } from "astro:env/server";
import {
  exchangeAccessCodeForAuthTokens,
  exchangeNpssoForAccessCode,
  getUserPlayedGames,
} from "psn-api";

import { createSingleton } from "~/lib/utils";

export async function createPSNApiInstance() {
  const accessCode = await exchangeNpssoForAccessCode(PSN_NPSSO);
  const authorization = await exchangeAccessCodeForAuthTokens(accessCode);

  return {
    authorization,
  };
}

export function getPSNApiInstance() {
  return createSingleton("psn-api", createPSNApiInstance);
}

export async function getPSNStats() {
  const { authorization } = await getPSNApiInstance();
  const title = await getUserPlayedGames(authorization, "me", {
    limit: 6,
    offset: 0,
    categories: "ps4_game,ps5_native_game",
  });
  return {
    recentlyPlayed: title.titles,
  };
}
