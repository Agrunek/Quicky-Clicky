import type { EvaluateReactionFunction } from '@/hooks/useGameState';

import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import useGameState from '@/hooks/useGameState';
import SetupView from '@/components/SetupView';
import ResultsView from '@/components/ResultsView';
import { getRandomItem, getWordPair } from '@/utils/collection';
import { POSSIBLE_FONT_FAMILIES, POSSIBLE_FONT_SIZES, POSSIBLE_FONT_WEIGHTS } from '@/constants/constants';

/* eslint-disable-next-line react-refresh/only-export-components */
const NameMatching = () => {
  const [wordPair, setWordPair] = useState<[string, string]>(['', '']);

  const evaluateReactionFn: EvaluateReactionFunction = useCallback(
    (time, confirmation) => {
      return {
        falseStart: false,
        reactionTimeMs: time,
        intentMatch: wordPair[0] === wordPair[1],
        isCorrect: confirmation === (wordPair[0] === wordPair[1]),
      };
    },
    [wordPair],
  );

  const { state, setupFn, startFn, restartFn } = useGameState(false, evaluateReactionFn);

  useLayoutEffect(() => {
    setWordPair(getWordPair(state.results, state.setup.trialCount - state.currentTrial + 1));
  }, [state.setup, state.currentTrial, state.results]);

  /* eslint-disable react-hooks/exhaustive-deps */
  const templateWordStyle = useMemo(
    () => ({
      fontFamily: getRandomItem(POSSIBLE_FONT_FAMILIES),
      fontSize: getRandomItem(POSSIBLE_FONT_SIZES),
      fontWeight: getRandomItem(POSSIBLE_FONT_WEIGHTS),
    }),
    [state.currentTrial],
  );

  const compareWordStyle = useMemo(
    () => ({
      fontFamily: getRandomItem(POSSIBLE_FONT_FAMILIES),
      fontSize: getRandomItem(POSSIBLE_FONT_SIZES),
      fontWeight: getRandomItem(POSSIBLE_FONT_WEIGHTS),
    }),
    [state.currentTrial],
  );
  /* eslint-enable react-hooks/exhaustive-deps */

  if (state.status === 'prep') {
    return <SetupView setup={state.setup} setupFn={setupFn} startFn={startFn} includeKeyDeny />;
  }

  if (state.status === 'dead') {
    return (
      <ResultsView
        name="Physical Matching"
        id="physical-matching"
        results={state.results}
        restartFn={restartFn}
        includeDecission
      />
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
      <div className="flex items-center justify-around gap-6 rounded-2xl border border-white/50 bg-white/25 px-6 py-4 shadow-md backdrop-blur-xs">
        <p style={templateWordStyle} className="mb-1 min-w-32 text-center text-white">
          {wordPair[0]}
        </p>
        <div className="h-16 w-0.5 bg-white/50" />
        <p style={compareWordStyle} className="mb-1 min-w-32 text-center text-white">
          {state.reactionReady && wordPair[1]}
        </p>
      </div>
    </div>
  );
};

export const Route = createFileRoute('/name-matching')({
  component: NameMatching,
});
