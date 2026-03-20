import js from "@eslint/js";
import tseslint from "typescript-eslint";
import jest from "eslint-plugin-jest";
import prettierRules from "eslint-plugin-prettier/recommended";
import { defineConfig } from "eslint/config";
import noRelativeImportPaths from "eslint-plugin-no-relative-import-paths";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import pluginSecurity from "eslint-plugin-security";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const typescriptRules = defineConfig({
  extends: [tseslint.configs.recommended],
  languageOptions: {
    parserOptions: {
      projectService: true,
      tsconfigRootDir: dirname(__dirname),
    },
  },
  rules: {
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-misused-promises": "error",
    "@typescript-eslint/return-await": ["error", "always"],
    "@typescript-eslint/explicit-module-boundary-types": [
      "error",
      { allowArgumentsExplicitlyTypedAsAny: true },
    ],
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      { allowExpressions: true },
    ],
  },
});

const javascriptRules = defineConfig({
  files: ["**/*.{js,mjs,cjs,ts,tsx}"],
  extends: [js.configs.recommended],
  languageOptions: {
    globals: {
      // Browser globals
      window: "readonly",
      document: "readonly",
      navigator: "readonly",
      location: "readonly",
      console: "readonly",
      fetch: "readonly",
      // Node.js globals
      process: "readonly",
      global: "readonly",
      __dirname: "readonly",
      __filename: "readonly",
    },
  },
  rules: {
    "no-multiple-empty-lines": ["error", { max: 1 }],
    "no-irregular-whitespace": "warn",
    "no-multi-spaces": "warn",
    "no-mixed-spaces-and-tabs": "warn",
    "no-trailing-spaces": "warn",
    "no-buffer-constructor": "error",
    "no-unused-vars": "off", // Don't need this with typescript rules
    "comma-dangle": "warn",
    quotes: ["error", "double", { avoidEscape: true }],
    "object-curly-spacing": ["error", "never"],
    eqeqeq: ["error", "smart"],
  },
});

const jestRules = defineConfig({
  files: ["**/*.test.{js,ts,tsx}", "**/*.spec.{js,ts,tsx}"],
  ...jest.configs["flat/recommended"],
  ...jest.configs["flat/style"],
  rules: {
    "jest/consistent-test-it": ["warn", { fn: "it" }],
    "jest/prefer-lowercase-title": "warn",
    "jest/prefer-hooks-on-top": "warn",
    "jest/no-standalone-expect": "off",
    "jest/expect-expect": "off",
    "jest/valid-expect": "off",
    "jest/valid-expect-in-promise": "off",
  },
});

const relativePathRules = defineConfig({
  plugins: {
    "no-relative-import-paths": noRelativeImportPaths,
  },
  rules: {
    "no-relative-import-paths/no-relative-import-paths": "error",
  },
});

const securityRules = defineConfig({
  // @ts-expect-error, the library is using an old version of eslint types
  extends: [pluginSecurity.configs.recommended],
  rules: {
    "security/detect-object-injection": "off", // Too many false positives, sometimes this is useful for cleaner code
  },
});

export default defineConfig([
  typescriptRules,
  javascriptRules,
  jestRules,
  relativePathRules,
  securityRules,
  prettierRules,
]);
