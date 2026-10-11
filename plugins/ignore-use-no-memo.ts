import type { Plugin } from "vite";

/**
 * Silences rolldown's MODULE_LEVEL_DIRECTIVE warnings for `"use no memo"`
 * (emitted by react-compiler-runtime). Fails the build if nothing was
 * silenced, so this plugin gets removed once the warning goes away upstream.
 */
export function ignoreUseNoMemo(): Plugin {
  let ignored = 0;

  return {
    name: "ignore-use-no-memo",
    apply: "build",
    onLog(level, log) {
      if (
        level === "warn" &&
        log.code === "MODULE_LEVEL_DIRECTIVE" &&
        log.message.includes("use no memo")
      ) {
        ignored++;
        return false;
      }

      return;
    },
    buildApp: {
      order: "post",
      async handler() {
        if (ignored === 0) {
          throw new Error(
            '[ignore-use-no-memo] No "use no memo" warnings were logged. Remove this plugin.',
          );
        }
      },
    },
  };
}
