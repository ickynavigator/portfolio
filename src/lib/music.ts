import { LastFm } from "@imikailoby/lastfm-ts";

import { env } from "~/lib/env/client";

export function createLastFMInstance() {
  const lastFm = new LastFm(env.LASTFM_API_KEY);

  return {
    lastFm,
  };
}

export async function getRecentlyPlayedTracks() {
  const l = createLastFMInstance();

  const response = await l.lastFm.user.getRecentTracks({
    user: env.LASTFM_USER,
    limit: "10",
  });
  return response;
}
