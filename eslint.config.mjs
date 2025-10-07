// @ts-check

import eslint from "@eslint/js";
import eslintPluginAstro from "eslint-plugin-astro";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import eslintPluginUnusedImports from "eslint-plugin-unused-imports";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
  {
    name: "my-rules/ignores",
    ignores: [
      "**/node_modules/",
      ".git/",
      ".astro/",
      "wrangler/",
      "dist/",
      ".partykit/",
    ],
  },
  {
    name: "my-rules/setup",
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
  eslint.configs.recommended,
  tseslint.configs.recommended,
  tseslint.configs.stylistic,
  eslintPluginAstro.configs["flat/recommended"],
  eslintPluginAstro.configs["flat/jsx-a11y-strict"],
  {
    name: "eslint-plugin-unused-imports",
    plugins: { "unused-imports": eslintPluginUnusedImports },
  },
  {
    name: "my-rules",
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
    name: "my-rules/eslint-plugin-prettier/astro-prettier-reset",
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
