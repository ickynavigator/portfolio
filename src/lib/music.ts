import { LastFm } from "@imikailoby/lastfm-ts";

import { getEnv } from "./env";

export function getLastFMInstance() {
  const env = getEnv();

  const lastFm = new LastFm(env.LASTFM_API_KEY);

  return {
    lastFm,
  };
}

export async function getRecentlyPlayedTracks() {
  const env = getEnv();
  const l = getLastFMInstance();

  const response = await l.lastFm.user.getRecentTracks({
    user: env.LASTFM_USER,
    limit: "10",
  });
  return response;
}
