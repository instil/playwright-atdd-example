import globals from "globals";
import { defineConfig } from "eslint/config";
// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import sharedEslintConfig from "../shared/config/eslint.config.base.mjs";
import playwright from "eslint-plugin-playwright";

export default defineConfig([
  sharedEslintConfig,
  {
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: ["src/**/*.ui.ts"],
    plugins: {
      playwright,
    },
    settings: {
      playwright: {
        globalAliases: {
          test: ["given", "when", "then"],
        },
      },
    },
    rules: {
      "playwright/no-focused-test": "error",
      "@typescript-eslint/typedef": ["error", { propertyDeclaration: true }],
    },
  },
]);
