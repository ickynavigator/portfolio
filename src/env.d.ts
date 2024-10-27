/// <reference types="astro/client" />
/// <reference types="@sanity/astro/module" />
/// <reference path="../.astro/types.d.ts" />
type Runtime = import("@astrojs/cloudflare").Runtime<Env>;

declare namespace App {
	interface Locals extends Runtime {}
}