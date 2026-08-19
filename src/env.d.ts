/// <reference types="@sanity/astro/module" />

import "styled-components";

type Runtime = import("@astrojs/cloudflare").Runtime<Env>;
type Theme = import("@sanity/ui/theme").Theme;

declare namespace App {
  interface Locals extends Runtime {}
}

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
