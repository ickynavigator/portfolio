/// <reference types="@sanity/astro/module" />

import "styled-components";

type Runtime = import("@astrojs/cloudflare").Runtime<Env>;
type Theme = import("@sanity/ui/theme").Theme;

declare namespace App {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface Locals extends Runtime {}
}

declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends Theme {}
}
