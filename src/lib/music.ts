import { LastFm } from "@imikailoby/lastfm-ts";
import { LASTFM_USER } from "astro:env/client";
import { LASTFM_API_KEY } from "astro:env/server";

export function createLastFMInstance() {
  const lastFm = new LastFm(LASTFM_API_KEY);

  return {
    lastFm,
  };
}

export async function getRecentlyPlayedTracks() {
  const l = createLastFMInstance();

  const response = await l.lastFm.user.getRecentTracks({
    user: LASTFM_USER,
    limit: "10",
  });
  return response;
}
