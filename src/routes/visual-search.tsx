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
      <Card className="flex min-w-80 items-center justify-between gap-4 p-4">
        <Text variant="subheading" className="flex-1 text-center text-3xl!">
          {alphaPair[0]}
        </Text>
        <div className="h-16 w-0.5 bg-white/50" />
        <div className="flex flex-1 items-center justify-center">
          <div style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }} className="grid">
            {alphaPair[1].map((alpha, idx) => (
              <div key={idx} className="flex size-12 items-center justify-center border border-white/50 bg-white/25">
                {state.reactionReady && (
                  <Text variant="subheading" className="pb-0.5 text-3xl!">
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
