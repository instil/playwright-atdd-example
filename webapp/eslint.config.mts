// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import sharedEslintConfig from "../shared/config/eslint.config.base.mjs";
import { defineConfig } from "eslint/config";
import reactHooks from "eslint-plugin-react-hooks";

const reactHooksRules = defineConfig([reactHooks.configs.flat.recommended]);

const webappRules = defineConfig([
  {
    languageOptions: {
      globals: {
        React: "readonly",
        JSX: "readonly",
      },
    },
  },
  {
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",
    },
  },
]);

export default defineConfig([
  sharedEslintConfig,
  reactHooksRules,
  webappRules,
  {
    files: ["src/state/**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/view/**"],
              message:
                "State layer cannot import from view layer. Use @/shared for shared utilities instead.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/shared/**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/view/**"],
              message: "Shared layer should not import from view layer",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/view/components/**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/view/pages/**"],
              message:
                "Components cannot import from pages. Pages should import components, not the other way around.",
            },
          ],
        },
      ],
    },
  },
  {
    ignores: [
      "node_modules/**",
      "out/**",
      "dist/**",
      "vite.config.ts",
      "vitest.config.mts",
      "eslint.config.mts",
    ],
  },
]);
