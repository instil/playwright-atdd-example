import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testMatch: /.*\.ui\.ts/,
  testDir: "./src",
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  workers: process.env.CI ? 4 : 2,
  reporter: [["html", { open: "never" }]],

  timeout: 60_000, // 60 seconds per test — allows for cold Vite server start-up under parallel load

  use: {
    /* Only take screenshots on failure to reduce overhead */
    screenshot: "only-on-failure",

    /* Shorter action timeout for faster failures */
    actionTimeout: 10_000, // 10 seconds for actions like click, fill

    /* Navigation timeout increased to handle Vite dev server cold-start under parallel load */
    navigationTimeout: 45_000, // 45 seconds for page navigations
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
