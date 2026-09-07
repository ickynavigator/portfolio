import type { AuthTokensResponse } from "psn-api";
import z from "zod";

export interface StoredAuthorization extends AuthTokensResponse {
  expiresAt: number;
}

export const AuthorizationSchema = z.toZod<AuthTokensResponse>()(
  z.object({
    accessToken: z.string(),
    expiresIn: z.number(),
    idToken: z.string(),
    refreshToken: z.string(),
    refreshTokenExpiresIn: z.number(),
    scope: z.string(),
    tokenType: z.string(),
  }),
);

export const StoredAuthorizationSchema = z.toZod<StoredAuthorization>()(
  AuthorizationSchema.safeExtend({
    expiresAt: z.number(),
  }),
);

export class AuthorizationStore {
  private KEY = "authorization";
  constructor(private env: Env) {}

  async get() {
    const _value = await this.env.PSN_AUTH_KV.get(this.KEY, "json");

    const value = StoredAuthorizationSchema.nullable().parse(_value);

    return value;
  }

  async getOrThrow() {
    const authorization = await this.get();

    if (!authorization) {
      throw new Error("No PSN authorization available");
    }

    return authorization;
  }

  async set(authorization: AuthTokensResponse) {
    const stored = StoredAuthorizationSchema.parse({
      ...authorization,
      expiresAt: Date.now() + authorization.expiresIn * 1000,
    });

    await this.env.PSN_AUTH_KV.put(this.KEY, JSON.stringify(stored));

    return stored;
  }
}
