import type { FileRoutesByPath } from '@tanstack/react-router';

import { RouterProvider, createMemoryHistory, createRouter } from '@tanstack/react-router';

import { routeTree } from './routeTree.gen';

const history = createMemoryHistory({
  initialEntries: ['/'],
});

const router = createRouter({ context: undefined!, history, routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const routePaths = Object.keys(router.routesByPath) as (keyof FileRoutesByPath)[];

const Router = () => {
  return <RouterProvider context={{ routePaths }} router={router} />;
};

export default Router;
