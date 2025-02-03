interface WakatimeResponses {
  [Wakatime.ENDPOINTS.statsWithRange]: WakatimeTypes.WakaTimeStats;
}

class Wakatime {
  static ENDPOINTS = {
    statsWithRange: "/api/v1/users/:user/stats/:range",
  } as const;

  #API_KEY: string;
  #API_BASE = new URL("https://wakatime.com/");

  constructor(API_KEY: string) {
    this.#API_KEY = Buffer.from(API_KEY).toString("base64");
  }

  async #fetch<
    const U extends Items<typeof Wakatime.ENDPOINTS>,
    T = WakatimeResponses[U],
  >(opts: {
    url: U;
    params: GetUrlParams<U>;
    urlParams?: Partial<Record<string, string | boolean | number>>;
  }) {
    const params = opts.params ?? {};
    let _url: string = opts.url;

    for (const [key, value] of Object.entries<string | number>(params)) {
      _url = _url.replace(`:${key}`, value.toString());
    }

    const constructedUrl = new URL(_url, this.#API_BASE);

    if (opts.urlParams) {
      for (const [key, value] of Object.entries(opts.urlParams)) {
        if (value === undefined) continue;
        constructedUrl.searchParams.set(key, value.toString());
      }
    }

    const response = await fetch(constructedUrl, {
      headers: {
        Authorization: `Basic ${this.#API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json<T>();
  }

  async getStatsWithRange(opts?: {
    user?: Creatable<"current">;
    range?: WakatimeTypes.Range;
    /** The keystroke timeout value used to calculate these stats. Defaults the the user's keystroke timeout value. */
    timeout?: number;
    /** The writes_only value used to calculate these stats. Defaults to the user's writes_only setting. */
    writes_only?: boolean;
  }) {
    return this.#fetch({
      url: Wakatime.ENDPOINTS.statsWithRange,
      params: {
        user: opts?.user ?? "current",
        range: opts?.range ?? "last_7_days",
      },
      urlParams: {
        timeout: opts?.timeout,
        writes_only: opts?.writes_only,
      },
    });
  }
}

export default Wakatime;
