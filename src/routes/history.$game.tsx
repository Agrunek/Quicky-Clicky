import type { FileRoutesByPath } from '@tanstack/react-router';

import type { StoreName } from '@/store/IndexedDB';

import { useRef, useState } from 'react';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useVirtualizer } from '@tanstack/react-virtual';

import Button from '@/components/atoms/Button';
import CenterWrapper from '@/components/atoms/CenterWrapper';
import Text from '@/components/atoms/Text';
import HistoryItem from '@/components/molecules/HistoryItem';
import { useNotiStack } from '@/contexts/NotiStackContext';
import { deleteGameAttempt, readGameAttempts } from '@/store/IndexedDB';
import { downloadXlsx } from '@/utils/spreadsheet';

/* eslint-disable-next-line react-refresh/only-export-components */
const History = () => {
  const router = useRouter();
  const { enqueue } = useNotiStack();

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
    <CenterWrapper className="flex min-h-svh w-full flex-col gap-5 px-3 py-24 sm:gap-8 sm:px-6">
      {sorted.length > 0 ? (
        <>
          <Button onClick={() => downloadXlsx(sorted)}>DOWNLOAD .XLSX</Button>
          <div ref={scrollRef} className="min-h-0 w-full flex-1">
            <div ref={virtualizer.containerRef} className="relative">
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
                      onDelete={async () => {
                        const deleted = await deleteGameAttempt(item.parent, item.uuid);

                        if (deleted) {
                          router.invalidate();
                          enqueue('Attempt has been deleted!', { duration: 3000, variant: 'success' });
                        }
                      }}
                      onDetails={() => setExpanded((current) => (current === item.uuid ? null : item.uuid))}
                      className="mx-2 mt-4 w-full max-w-3xl sm:mx-8"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <Text as="h1" variant="heading" className="max-w-lg text-center text-xl! sm:text-2xl!">
          No results yet. Play a game to see your results here!
        </Text>
      )}
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
