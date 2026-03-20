import {
  given,
  setup,
  then,
  when,
  expect,
} from "@/playwright-alias/PlaywrightAlias";

// https://instil.atlassian.net/browse/MYSITE-1
given("a User wants to go to My Site", () => {
  when("they go to My Site", () => {
    setup(async ({ mySite }) => {
      await mySite.goTo();
    });

    then("the header should be visible", async ({ mySite }) => {
      expect(await mySite.header.getTitle()).toBe("My Site");
    });
  });
});
