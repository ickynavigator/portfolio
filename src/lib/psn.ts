import { PSN_NPSSO } from "astro:env/server";
import {
  exchangeAccessCodeForAuthTokens,
  exchangeNpssoForAccessCode,
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
