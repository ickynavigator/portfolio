class Wakatime {
  #API_KEY: string;
  #API_BASE = new URL("https://wakatime.com/");

  constructor(API_KEY: string) {
    this.#API_KEY = Buffer.from(API_KEY).toString("base64");
  }

  async #fetch<T>(url: string) {
    const response = await fetch(new URL(url, this.#API_BASE), {
      headers: {
        Authorization: `Basic ${this.#API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json<T>();
  }

  async getStats(opts?: {
    user?: Creatable<"current">;
    range?: WakatimeTypes.Range;
  }) {
    const user = opts?.user ?? "current";
    const range = opts?.range ?? "last_7_days";

    return this.#fetch<WakatimeTypes.WakaTimeStats>(
      `/api/v1/users/${user}/stats/${range}`,
    );
  }
}

export default Wakatime;
