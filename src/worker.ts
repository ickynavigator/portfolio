import { handle } from "@astrojs/cloudflare/handler";

export { PsnAuth } from "~/durable/refresh-psn";

export default {
  fetch: handle,
} satisfies ExportedHandler<Env>;
