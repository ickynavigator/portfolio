import type { Block } from "astro-portabletext/types";
import { cx, type CxOptions } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: CxOptions) {
  return twMerge(cx(inputs));
}

export function getTextFromPortableTextBlock(block?: Block) {
  return (block?.children ?? []).reduce((acc, curr) => (acc += curr?.text), "");
}

export function unwrapFuncOrValue<T>(funcOrValue: FuncOrValue<T>) {
  if (typeof funcOrValue === "function") {
    return (funcOrValue as () => T)();
  } else {
    return funcOrValue;
  }
}

export async function tryCatch<T, E = Error>(
  fn: FuncOrValue<T>,
): Promise<Result<Awaited<T>, E>> {
  try {
    const data = await unwrapFuncOrValue(fn);

    return { success: true, data, error: null };
  } catch (error) {
    return { success: false, data: null, error: error as E };
  }
}
