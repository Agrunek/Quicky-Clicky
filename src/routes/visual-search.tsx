import type { EvaluateReactionFunction } from '@/hooks/useGameState';

import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import useGameState from '@/hooks/useGameState';
import SetupView from '@/components/SetupView';
import ResultsView from '@/components/ResultsView';
import { getAlphaPair } from '@/utils/collection';
import { getRectangularGrid } from '@/utils/geometry';

/* eslint-disable-next-line react-refresh/only-export-components */
const VisualSearch = () => {
  const [alphaPair, setAlphaPair] = useState<[string, string[]]>(['', []]);

  const evaluateReactionFn: EvaluateReactionFunction = useCallback(
    (time, confirmation) => {
      return {
        falseStart: false,
        reactionTimeMs: time,
        intentMatch: alphaPair[1].includes(alphaPair[0]),
        isCorrect: confirmation === alphaPair[1].includes(alphaPair[0]),
      };
    },
    [alphaPair],
  );

  const { state, setupFn, startFn, restartFn } = useGameState(false, evaluateReactionFn);

  useLayoutEffect(() => {
    /* eslint-disable-next-line react-hooks/set-state-in-effect */
    setAlphaPair(
      getAlphaPair(state.results, state.setup.trialCount - state.currentTrial + 1, state.setup.numberOfItems || 0),
    );
  }, [state.setup, state.currentTrial, state.results]);

  const [, cols] = useMemo(() => getRectangularGrid(state.setup.numberOfItems || 0), [state.setup]);

  if (state.status === 'prep') {
    return <SetupView setup={state.setup} setupFn={setupFn} startFn={startFn} includeKeyDeny includeNumberOfItems />;
  }

  if (state.status === 'dead') {
    return (
      <ResultsView
        name={`Visual Search (${state.setup.numberOfItems})`}
        id={`visual-search-${state.setup.numberOfItems}`}
        results={state.results}
        restartFn={restartFn}
        includeDecission
      />
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
      <div className="flex items-center justify-around gap-6 rounded-2xl border border-white/50 bg-white/25 px-6 py-4 shadow-md backdrop-blur-xs">
        <p className="mb-1 min-w-32 text-center text-4xl text-white">{alphaPair[0]}</p>
        <div className="h-16 w-0.5 bg-white/50" />
        <div style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }} className="grid min-w-32">
          {alphaPair[1].map((alpha, idx) => (
            <div key={idx} className="m-auto size-12 border border-white/50 bg-white/25">
              {state.reactionReady && <p className="size-full text-center text-4xl text-white">{alpha}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute('/visual-search')({
  component: VisualSearch,
});
