import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTextFromPortableTextNode(node?: { text?: string }[]) {
  return (node ?? []).reduce((acc, curr) => (acc += curr?.text), "");
}
