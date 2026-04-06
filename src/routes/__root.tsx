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

/* eslint-disable-next-line react-refresh/only-export-components */
const NotFound = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <p className="text-2xl font-bold text-white">404 Page not found!</p>
    </div>
  );
};

/* eslint-disable-next-line react-refresh/only-export-components */
const ErrorOccured = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <p className="text-2xl font-bold text-white">Something went wrong!</p>
    </div>
  );
};

export const Route = createRootRoute({
  component: () => <Root />,
  notFoundComponent: () => <NotFound />,
  errorComponent: () => <ErrorOccured />,
});
