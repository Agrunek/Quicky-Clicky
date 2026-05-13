import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import Link from '@/components/Link';

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
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4">
      <p className="text-2xl font-bold text-white text-shadow-md">404 Page not found!</p>
      <Link to="/">TAKE ME TO HOME PAGE</Link>
    </div>
  );
};

/* eslint-disable-next-line react-refresh/only-export-components */
const ErrorOccured = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4">
      <p className="text-2xl font-bold text-white text-shadow-md">Something went wrong!</p>
      <Link to="/">TAKE ME TO HOME PAGE</Link>
    </div>
  );
};

export const Route = createRootRoute({
  component: () => <Root />,
  notFoundComponent: () => <NotFound />,
  errorComponent: () => <ErrorOccured />,
});
