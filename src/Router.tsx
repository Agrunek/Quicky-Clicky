import { createRouter, RouterProvider } from '@tanstack/react-router';

import { routeTree } from './routeTree.gen';

const router = createRouter({ routeTree, context: undefined! });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
