import type { FC } from "react";
import { Outlet } from "react-router";

export const Layout: FC = () => {
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
