import fs from "fs/promises";
import type { Plugin } from "vite";

interface Redirect {
  source: string;
  destination: string;
  code?: number;
}

export default function cfRedirectsVitePlugin(redirects: Redirect[]): Plugin {
  let runCount = 0;

  return {
    name: "custom-cloudflare-redirects",
    async closeBundle() {
      runCount++;
      if (runCount > 1) return;

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
