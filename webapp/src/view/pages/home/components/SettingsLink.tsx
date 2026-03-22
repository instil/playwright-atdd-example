import type { FC } from "react";
import { Link } from "react-router";
import { HOME_PAGE_TEST_ID } from "@/view/pages/home/constants/HomePageTestIds";

export const SettingsLink: FC = () => (
  <Link
    data-testid={`${HOME_PAGE_TEST_ID}__settingsLink`}
    to="/settings"
    className="text-sm text-neutral-500 hover:text-neutral-800 dark:text-white dark:hover:text-neutral-400"
  >
    Settings
  </Link>
);
