import globals from "globals";
import { defineConfig } from "eslint/config";
// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import sharedEslintConfig from "./config/eslint.config.base.mjs";

export default defineConfig([
  sharedEslintConfig,
  {
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: ["src/**/*.ts"],
  },
]);
