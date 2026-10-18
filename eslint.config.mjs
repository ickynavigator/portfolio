// @ts-check

import eslintPluginJs from "@eslint/js";
import { plugin as eslintPluginShadcn } from "@shadcn/lint";
import eslintPluginAstro from "eslint-plugin-astro";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import eslintPluginUnusedImports from "eslint-plugin-unused-imports";
import { defineConfig, globalIgnores } from "eslint/config";
import eslintPluginTs from "typescript-eslint";

const HEADER = "my-rules";

const myEslintPluginUnusedImports = {
  configs: {
    recommended: defineConfig({
      name: `${HEADER}/eslint-plugin-unused-imports`,
      plugins: { "unused-imports": eslintPluginUnusedImports },
      rules: {
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "unused-imports/no-unused-imports": "error",
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
    }),
  },
};

const myEslintPluginPrettier = {
  configs: {
    recommended: defineConfig(eslintPluginPrettier, {
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
    }),
  },
};

const myEslintPluginShadcn = {
  configs: {
    recommended: defineConfig({
      name: `${HEADER}/eslint-plugin-shadcn`,
      plugins: { shadcn: eslintPluginShadcn },
      // rules: {
      //   "shadcn/no-restyle": "error",
      //   "shadcn/no-raw-colors": "error",
      //   "shadcn/no-arbitrary-values": "error",
      //   "shadcn/no-inline-styles": "error",
      //   "shadcn/no-unknown-classes": "warn",
      //   "shadcn/require-static-classes": "error",
      // },
    }),
  },
};

export default defineConfig(
  globalIgnores(
    [
      "**/node_modules/",
      ".git/",
      ".astro/",
      "wrangler/",
      "dist/",
      ".sanity/",
      "./worker-configuration.d.ts",
      "./sanity.types.ts",
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
  eslintPluginAstro.configs.recommended,
  eslintPluginAstro.configs["jsx-a11y-strict"],
  myEslintPluginUnusedImports.configs.recommended,
  myEslintPluginShadcn.configs.recommended,
  myEslintPluginPrettier.configs.recommended,
  {
    name: `${HEADER}`,
    rules: {
      "@typescript-eslint/no-empty-object-type": "off",
    },
  },
);
