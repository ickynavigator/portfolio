import { cx, type CxOptions } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: CxOptions) {
  return twMerge(cx(inputs));
}

export function getTextFromPortableTextNode(node?: { text?: string }[]) {
  return (node ?? []).reduce((acc, curr) => (acc += curr?.text), "");
}
