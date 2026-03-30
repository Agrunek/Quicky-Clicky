import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

/* eslint-disable-next-line react-refresh/only-export-components */
const Root = () => {
  return (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
};

export const Route = createRootRoute({
  component: () => <Root />,
});
