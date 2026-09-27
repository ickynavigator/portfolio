import type { Block } from "astro-portabletext/types";

export function getTextFromPortableTextBlock(block?: Block) {
  return (block?.children ?? []).reduce((acc, curr) => {
    acc += curr?.text;
    return acc;
  }, "");
}
