import type { FileRoutesByPath } from '@tanstack/react-router';

import type { StoreName } from '@/store/IndexedDB';

import { createFileRoute } from '@tanstack/react-router';

import { readGameAttempts } from '@/store/IndexedDB';

/* eslint-disable-next-line react-refresh/only-export-components */
const History = () => {
  const attempts = Route.useLoaderData();
  console.log(attempts);

  return null;
};

const pathToStoreName = (path: keyof FileRoutesByPath): StoreName | undefined => {
  switch (path) {
    case '/class-matching':
      return 'ClassMatching';
    case '/name-matching':
      return 'NameMatching';
    case '/physical-matching':
      return 'PhysicalMatching';
    case '/simple-reaction':
      return 'SimpleReaction';
    case '/visual-search':
      return 'VisualSearch';
  }
};

export const Route = createFileRoute('/history/$game')({
  beforeLoad: ({ context, params }) => {
    const path = context.routePaths.find((path) => path === `/${params.game}`) || '/';
    return { store: pathToStoreName(path) };
  },
  component: () => <History />,
  loader: ({ context }) => readGameAttempts(context.store),
});
