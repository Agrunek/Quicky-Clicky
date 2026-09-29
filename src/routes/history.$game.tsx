import type { FileRoutesByPath } from '@tanstack/react-router';

import type { StoreName } from '@/store/IndexedDB';

import { useRef, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useVirtualizer } from '@tanstack/react-virtual';

import CenterWrapper from '@/components/atoms/CenterWrapper';
import HistoryItem from '@/components/molecules/HistoryItem';
import { readGameAttempts } from '@/store/IndexedDB';

/* eslint-disable-next-line react-refresh/only-export-components */
const History = () => {
  const attempts = Route.useLoaderData();
  const sorted = [...attempts].sort((a, b) => b.timestamp - a.timestamp);
  const [expanded, setExpanded] = useState<null | string>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  /* eslint-disable-next-line react-hooks/incompatible-library */
  const virtualizer = useVirtualizer({
    count: sorted.length,
    directDomUpdates: true,
    estimateSize: () => 115.2,
    getScrollElement: () => scrollRef.current,
    measureElement: (element) => element.getBoundingClientRect().height,
    overscan: 5,
  });

  return (
    <CenterWrapper>
      <div ref={scrollRef} className="h-full flex-1">
        <div ref={virtualizer.containerRef} className="relative my-24">
          {virtualizer.getVirtualItems().map((virtualItem) => {
            const item = sorted[virtualItem.index];
            return (
              <div
                key={virtualItem.key}
                ref={virtualizer.measureElement}
                data-index={virtualItem.index}
                className="absolute top-0 left-0 flex w-full justify-center"
              >
                <HistoryItem
                  expanded={expanded === item.uuid}
                  item={item}
                  onDetailsPressed={() => setExpanded((current) => (current === item.uuid ? null : item.uuid))}
                  className="mx-16 mt-4 w-full max-w-3xl"
                />
              </div>
            );
          })}
        </div>
      </div>
    </CenterWrapper>
  );
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
