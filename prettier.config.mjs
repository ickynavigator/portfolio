// @ts-check

/** @type {import('prettier').Config & import("@ianvs/prettier-plugin-sort-imports").PluginConfig & import('prettier-plugin-tailwindcss').PluginOptions} */
export default {
  tabWidth: 2,
  printWidth: 80,
  jsxSingleQuote: false,
  singleQuote: false,
  semi: true,
  trailingComma: "all",
  arrowParens: "always",
  endOfLine: "auto",

  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-astro",
    "prettier-plugin-tailwindcss",
  ],

  // #region @ianvs/prettier-plugin-sort-imports
  importOrder: ["<THIRD_PARTY_MODULES>", "", "^~/", "^[.][.]/", "^[.]/"],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderTypeScriptVersion: "5.0.0",
  // #endregion @ianvs/prettier-plugin-sort-imports

  // #region prettier-plugin-tailwindcss
  tailwindFunctions: ["clsx", "cva", "cn", "cx", "twMerge"],
  // #endregion prettier-plugin-tailwindcss

  // #region prettier-plugin-astro
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
  // #endregion prettier-plugin-astro
};
