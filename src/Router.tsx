import { RouterProvider, createMemoryHistory, createRouter } from '@tanstack/react-router';

import { routeTree } from './routeTree.gen';

const history = createMemoryHistory({
  initialEntries: ['/'],
});

const router = createRouter({ history, routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
