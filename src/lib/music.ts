import { LastFm } from "@imikailoby/lastfm-ts";

import { getEnv } from "./env";

const env = getEnv();

const getApi = async () => {
  const api = new LastFm(env.LASTFM_API_KEY);

  return api;
};

export const getRecentlyPlayedTracks = async () => {
  const api = await getApi();
  const response = await api.user.getRecentTracks({
    user: env.LASTFM_USER,
    limit: "10",
  });
  return response.recenttracks;
};

export default await getApi();
