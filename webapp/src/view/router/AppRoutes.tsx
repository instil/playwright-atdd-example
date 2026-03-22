import type { FC } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Layout } from "@/view/router/components/Layout";
import { HomePage } from "@/view/pages/home/HomePage";
import { GamePage } from "@/view/pages/game/GamePage";
import { SettingsPage } from "@/view/pages/settings/SettingsPage";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/game", element: <GamePage /> },
      { path: "/settings", element: <SettingsPage /> },
    ],
  },
]);

export const AppRoutes: FC = () => <RouterProvider router={router} />;
