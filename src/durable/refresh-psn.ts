import { DurableObject } from "cloudflare:workers";
import {
  exchangeAccessCodeForAuthTokens,
  exchangeNpssoForAccessCode,
  exchangeRefreshTokenForAuthTokens,
  type AuthTokensResponse,
} from "psn-api";

import {
  AuthorizationStore,
  type StoredAuthorization,
} from "~/durable/refresh-psn.utils";

export class PsnAuth extends DurableObject {
  REFRESH_BUFFER_MS = 60 * 1000;
  authStore: AuthorizationStore;

  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);

    this.authStore = new AuthorizationStore(env);

    this.ctx.blockConcurrencyWhile(async () => {
      const authorization = await this.authStore.get();

      if (!authorization) {
        await this.initialize();
      }
    });
  }

  private async updateAuthorization(authorization: AuthTokensResponse) {
    const stored = await this.authStore.set(authorization);
    await this.scheduleRefresh(stored);

    return stored;
  }

  private async scheduleRefresh(storedAuthorization: StoredAuthorization) {
    const refreshAt = storedAuthorization.expiresAt - this.REFRESH_BUFFER_MS;

    await this.ctx.storage.setAlarm(Math.max(Date.now() + 1000, refreshAt));
  }

  private async initialize() {
    const accessCode = await exchangeNpssoForAccessCode(this.env.PSN_NPSSO);
    const authorization = await exchangeAccessCodeForAuthTokens(accessCode);

    return this.updateAuthorization(authorization);
  }

  private async refresh() {
    console.log("Refreshing PSN authorization...");
    const authorization = await this.authStore.get();

    if (!authorization) {
      return await this.initialize();
    }

    const updatedAuthorization = await exchangeRefreshTokenForAuthTokens(
      authorization.refreshToken,
    );

    return this.updateAuthorization(updatedAuthorization);
  }

  override async alarm() {
    const authorization = await this.authStore.get();

    if (!authorization) {
      await this.initialize();
      return;
    }

    const refreshAt = authorization.expiresAt - this.REFRESH_BUFFER_MS;

    if (Date.now() < refreshAt) {
      await this.scheduleRefresh(authorization);
      return;
    }

    await this.refresh();
  }
}
