import { DurableObject } from "cloudflare:workers";
import {
  exchangeAccessCodeForAuthTokens,
  exchangeNpssoForAccessCode,
  exchangeRefreshTokenForAuthTokens,
  type AuthTokensResponse,
} from "psn-api";
import z from "zod";

const REFRESH_BUFFER_MS = 60 * 1000;
const RENEW_BACKOFF_MS = 5 * 60 * 1000;
const STORAGE_KEY = "authorization";
const RENEW_FAILED_AT_KEY = "renewFailedAt";

export interface StoredAuthorization extends AuthTokensResponse {
  expiresAt: number;
}

const StoredAuthorizationSchema = z.toZod<StoredAuthorization>()(
  z.object({
    accessToken: z.string(),
    expiresIn: z.number(),
    idToken: z.string(),
    refreshToken: z.string(),
    refreshTokenExpiresIn: z.number(),
    scope: z.string(),
    tokenType: z.string(),
    expiresAt: z.number(),
  }),
);

export class PsnAuth extends DurableObject<Env> {
  #renewing: Promise<StoredAuthorization> | undefined;

  async getAuthorization(): Promise<StoredAuthorization> {
    return this.#ensureFresh();
  }

  override async alarm() {
    await this.#ensureFresh();
  }

  async #ensureFresh() {
    const current = await this.#read();
    const authorization =
      current && Date.now() < refreshAt(current)
        ? current
        : await this.#renew(current);

    await this.ctx.storage.setAlarm(
      Math.max(Date.now() + 1000, refreshAt(authorization)),
    );

    return authorization;
  }

  async #renew(current: StoredAuthorization | null) {
    const failedAt = await this.ctx.storage.get<number>(RENEW_FAILED_AT_KEY);
    if (failedAt !== undefined && Date.now() < failedAt + RENEW_BACKOFF_MS) {
      throw new Error("PSN authorization renewal recently failed, backing off");
    }

    this.#renewing ??= this.#exchange(current)
      .then((tokens) => this.#write(tokens))
      .catch(async (error: unknown) => {
        await this.ctx.storage.put(RENEW_FAILED_AT_KEY, Date.now());
        throw error;
      })
      .finally(() => {
        this.#renewing = undefined;
      });

    return this.#renewing;
  }

  async #exchange(current: StoredAuthorization | null) {
    if (current) {
      try {
        console.log("Refreshing PSN authorization...");
        return await exchangeRefreshTokenForAuthTokens(current.refreshToken);
      } catch (error) {
        console.warn("PSN refresh failed, reinitializing from NPSSO", error);
      }
    }

    console.log("Initializing PSN authorization from NPSSO...");
    const accessCode = await exchangeNpssoForAccessCode(this.env.PSN_NPSSO);
    return exchangeAccessCodeForAuthTokens(accessCode);
  }

  async #read() {
    const value = await this.ctx.storage.get(STORAGE_KEY);
    const parsed = StoredAuthorizationSchema.safeParse(value);

    return parsed.success ? parsed.data : null;
  }

  async #write(tokens: AuthTokensResponse) {
    const stored = StoredAuthorizationSchema.parse({
      ...tokens,
      expiresAt: Date.now() + tokens.expiresIn * 1000,
    });

    await this.ctx.storage.put(STORAGE_KEY, stored);
    await this.ctx.storage.delete(RENEW_FAILED_AT_KEY);

    return stored;
  }
}

function refreshAt(authorization: StoredAuthorization) {
  return authorization.expiresAt - REFRESH_BUFFER_MS;
}
