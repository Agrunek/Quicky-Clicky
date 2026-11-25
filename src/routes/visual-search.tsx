import type { EvaluateReactionFunction } from '@/hooks/useGameState';

import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';

import Card from '@/components/atoms/Card';
import CenterWrapper from '@/components/atoms/CenterWrapper';
import Text from '@/components/atoms/Text';
import ResultView from '@/components/organisms/ResultView';
import SetupView from '@/components/organisms/SetupView';
import useGameState from '@/hooks/useGameState';
import { VISUAL_SEARCH_STORE } from '@/store/IndexedDB';
import { getAlphaPair } from '@/utils/collection';
import { getRectangularGrid } from '@/utils/geometry';

/* eslint-disable-next-line react-refresh/only-export-components */
const VisualSearch = () => {
  const [alphaPair, setAlphaPair] = useState<[string, string[]]>(['', []]);

  const evaluateReactionFn: EvaluateReactionFunction = useCallback(
    (time, confirmation) => ({
      falseStart: false,
      intentMatch: alphaPair[1].includes(alphaPair[0]),
      isCorrect: confirmation === alphaPair[1].includes(alphaPair[0]),
      reactionTimeMs: time,
    }),
    [alphaPair],
  );

  const { restartFn, setupFn, startFn, state } = useGameState(false, evaluateReactionFn);

  const size = useMemo(() => state.setup.numberOfItems || 0, [state.setup.numberOfItems]);
  const cols = useMemo(() => getRectangularGrid(size)[1], [size]);

  useLayoutEffect(() => {
    /* eslint-disable-next-line react-hooks/set-state-in-effect */
    setAlphaPair(getAlphaPair(state.results, state.setup.trialCount - state.currentTrial + 1, size));
  }, [state.setup, state.currentTrial, state.results, size]);

  if (state.status === 'prep') {
    return <SetupView includeKeyDeny includeNumberOfItems setup={state.setup} setupFn={setupFn} startFn={startFn} />;
  }

  if (state.status === 'dead') {
    return (
      <ResultView
        id={`visual-search-${size}`}
        name={`Visual Search (${size})`}
        includeDecission
        restartFn={restartFn}
        results={state.results}
        storeName={VISUAL_SEARCH_STORE}
      />
    );
  }

  return (
    <CenterWrapper>
      <Card className="flex w-full max-w-2xl items-center justify-between gap-3 p-3 sm:gap-5 sm:p-5!">
        <Text variant="subheading" className="flex-1 text-center text-3xl!">
          {alphaPair[0]}
        </Text>
        <div className="h-14 w-px shrink-0 bg-app-divider sm:h-16" />
        <div className="flex flex-1 items-center justify-center">
          <div style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }} className="grid">
            {alphaPair[1].map((alpha, idx) => (
              <div
                key={idx}
                className="flex size-6 items-center justify-center rounded-lg border border-app-border bg-app-grid min-[375px]:size-7 sm:size-9 lg:size-12"
              >
                {state.reactionReady && (
                  <Text
                    variant="subheading"
                    className="pb-0.5 text-base! min-[375px]:text-lg! sm:text-2xl! lg:text-3xl!"
                  >
                    {alpha}
                  </Text>
                )}
              </div>
            ))}
          </div>
        </div>
      </Card>
    </CenterWrapper>
  );
};

export const Route = createFileRoute('/visual-search')({
  component: () => <VisualSearch />,
});
