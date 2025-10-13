// @ts-check

import eslintPluginJs from "@eslint/js";
import eslintPluginAstro from "eslint-plugin-astro";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import eslintPluginUnusedImports from "eslint-plugin-unused-imports";
import { defineConfig, globalIgnores } from "eslint/config";
import eslintPluginTs from "typescript-eslint";

const HEADER = "my-rules";

export default defineConfig(
  globalIgnores(
    [
      "**/node_modules/",
      ".git/",
      ".astro/",
      "wrangler/",
      "dist/",
      ".partykit/",
      ".sanity/",
      "./worker-configuration.d.ts",
    ],
    `${HEADER}/ignores`,
  ),
  {
    name: `${HEADER}/setup`,
    linterOptions: {
      reportUnusedDisableDirectives: "error",
      reportUnusedInlineConfigs: "error",
    },
    languageOptions: {
      parserOptions: {
        project: true,
      },
    },
  },
  eslintPluginJs.configs.recommended,
  eslintPluginTs.configs.recommended,
  eslintPluginTs.configs.stylistic,
  eslintPluginAstro.configs["flat/recommended"],
  eslintPluginAstro.configs["flat/jsx-a11y-strict"],
  {
    name: "eslint-plugin-unused-imports",
    plugins: { "unused-imports": eslintPluginUnusedImports },
  },
  {
    name: `${HEADER}`,
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "@typescript-eslint/no-empty-object-type": "off",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
  eslintPluginPrettier,
  {
    name: `${HEADER}/eslint-plugin-prettier/astro-prettier-reset`,
    files: [
      "**/*.astro/*.js",
      "*.astro/*.js",
      "**/*.astro/*.ts",
      "*.astro/*.ts",
    ],
    rules: {
      "prettier/prettier": "off",
    },
  },
);
