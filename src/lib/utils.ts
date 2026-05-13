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

export function unwrapFuncOrValue<T>(funcOrValue: FuncOrValue<T>) {
  return funcOrValue instanceof Function ? funcOrValue() : funcOrValue;
}

function toError(error: unknown): Error {
  return error instanceof Error ? error : new Error(String(error));
}
export async function tryCatch<T>(
  fn: FuncOrValue<T>,
): Promise<Result<Awaited<T>, Error>>;
export async function tryCatch<T, E>(
  fn: FuncOrValue<T>,
  errorMapper: (error: unknown) => E,
): Promise<Result<Awaited<T>, E>>;
export async function tryCatch<T, E>(
  fn: FuncOrValue<T>,
  errorMapper?: (error: unknown) => E,
): Promise<Result<Awaited<T>, Error | E>> {
  try {
    const data = await unwrapFuncOrValue(fn);

    return {
      success: true,
      data,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: errorMapper ? errorMapper(error) : toError(error),
    };
  }
}
