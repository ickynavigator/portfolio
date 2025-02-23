import fs from "fs/promises";
import type { Plugin } from "vite";

interface Redirect {
  source: string;
  destination: string;
  code?: number;
}

export default function cfRedirectsVitePlugin(redirects: Redirect[]): Plugin {
  return {
    name: "custom-cloudflare-redirects",
    async closeBundle() {
      const _redirects = redirects.reduce((acc, r) => {
        return acc + `${r.source} ${r.destination} ${r.code ?? 302}\n`;
      }, "");

      await fs.writeFile(`dist/_redirects`, _redirects);
    },
  };
}
