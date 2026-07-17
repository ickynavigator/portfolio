import { PSN_NPSSO } from "astro:env/server";
import {
  exchangeAccessCodeForAuthTokens,
  exchangeNpssoForAccessCode,
  getUserPlayedGames,
} from "psn-api";

export async function createPSNApiInstance() {
  const accessCode = await exchangeNpssoForAccessCode(PSN_NPSSO);
  const authorization = await exchangeAccessCodeForAuthTokens(accessCode);

  return {
    authorization,
  };
}

export async function getPSNStats() {
  const { authorization } = await createPSNApiInstance();
  const title = await getUserPlayedGames(authorization, "me", {
    limit: 10,
    offset: 0,
    categories: "ps4_game,ps5_native_game",
  });
  return {
    recentlyPlayed: title.titles,
  };
}
