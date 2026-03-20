import {
  expect as playwrightExpect,
  test as playwrightTest,
  type BrowserContext,
  type Page,
} from "@playwright/test";
import { MySite } from "@/dsl/webapp/MySiteDsl";

const _given = (title: string, body: () => void): void =>
  playwrightTest.describe(`given ${title}`, body);
_given.only = (title: string, body: () => void): void =>
  playwrightTest.describe.only(`given ${title}`, body);
_given.skip = (title: string, body: () => void): void =>
  playwrightTest.describe.skip(`given ${title}`, body);
export const given = _given as typeof playwrightTest.describe;

const _when = (title: string, body: () => void): void =>
  playwrightTest.describe(`when ${title}`, body);
_when.only = (title: string, body: () => void): void =>
  playwrightTest.describe.only(`when ${title}`, body);
_when.skip = (title: string, body: () => void): void =>
  playwrightTest.describe.skip(`when ${title}`, body);
export const when = _when as typeof playwrightTest.describe;

type CustomFixtures = {
  mySite: MySite;
};

type WorkerFixtures = {
  sharedContext: {
    context: BrowserContext;
    page: Page;
  };
};

const _thenWithForcedFixture = playwrightTest.extend<
  CustomFixtures,
  WorkerFixtures
>({
  // Worker-scoped fixture: create once per worker, reuse across all tests
  sharedContext: [
    async ({ browser }, use) => {
      const context = await browser.newContext({
        permissions: ["clipboard-read", "clipboard-write"],
      });
      const page = await context.newPage();

      // Turn off css animations
      await page.addStyleTag({
        content: `
        *, *::before, *::after {
          animation-duration: 0s !important;
          transition-duration: 0s !important;
        }
      `,
      });

      await use({ context, page });

      await context.close();
    },
    { scope: "worker" },
  ],

  // Prevent page from being used in tests, it should only be available in the DSL
  page: undefined,

  // Test-scoped fixture: create a DSL instance per test, but reuse context/page
  mySite: async ({ sharedContext }, use) => {
    const { context, page } = sharedContext;

    // Clear route handlers from previous tests
    await page.unrouteAll({ behavior: "ignoreErrors" });

    // Reset clock from previous tests
    await page.clock.setSystemTime(new Date());

    const mySiteInstance = new MySite(context, page);

    await use(mySiteInstance);
  },
});

type TestBody = Parameters<typeof _thenWithForcedFixture.only>[2];
interface Then {
  (title: string, body: TestBody): void;
  only: (title: string, body: TestBody) => void;
  skip: (title: string, body: TestBody) => void;
}

export const then: Then = (title, body): void =>
  _thenWithForcedFixture(`then ${title}`, body);
then.only = (title, body): void =>
  _thenWithForcedFixture.only(`then ${title}`, body);
then.skip = (title, body): void =>
  _thenWithForcedFixture.skip(`then ${title}`, body);

export const setup = _thenWithForcedFixture.beforeEach;
export const expect = playwrightExpect;
