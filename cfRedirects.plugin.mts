import fs from "fs/promises";
import type { Plugin } from "vite";

const cfRedirectsVitePlugin = (
  redirects: {
    source: string;
    destination: string;
    code: number;
  }[],
): Plugin => {
  return {
    name: "custom-cloudflare-redirects",
    closeBundle() {
      const _redirects = redirects.reduce((acc, r) => {
        return acc + `${r.source} ${r.destination} ${r.code}\n`;
      }, "");

      fs.writeFile(`./dist/_redirects`, _redirects);
    },
  };
};

export default cfRedirectsVitePlugin;
