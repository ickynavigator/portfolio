import type { Block } from "astro-portabletext/types";
import { cx, type CxOptions } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: CxOptions) {
  return twMerge(cx(inputs));
}

export function getTextFromPortableTextBlock(block?: Block) {
  return (block?.children ?? []).reduce((acc, curr) => {
    acc += curr?.text;
    return acc;
  }, "");
}

export function createSingleton<T>(name: string, create: () => T): T {
  const s = Symbol.for(name);
  const g = globalThis as unknown as Record<symbol, T | undefined>;

  let scope = g[s];
  if (scope === undefined) {
    scope = create();
    g[s] = scope;
  }

  return scope as T;
}
