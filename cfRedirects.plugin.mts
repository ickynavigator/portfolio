import fs from "fs/promises";
import type { Plugin } from "vite";

interface Redirect {
  source: string;
  destination: string;
  code?: number;
}

export default function cfRedirectsVitePlugin(
  redirects: [Redirect, ...Redirect[]],
): Plugin {
  return {
    name: "custom-cloudflare-redirects",
    apply: "build",
    applyToEnvironment: (env) => env.name === "client",
    async closeBundle() {
      if (!redirects.length) {
        this.warn({ message: `No redirects to write` });
        return;
      }

      const _redirects = redirects.reduce((acc, r) => {
        return acc + `${r.source} ${r.destination} ${r.code ?? 302}\n`;
      }, "");

      this.info({
        message: `Writing _redirects file with ${redirects.length} redirects`,
      });

      await fs.writeFile(`dist/_redirects`, _redirects);

      this.info({
        message: `Finished writing _redirects file`,
      });
    },
  };
}
