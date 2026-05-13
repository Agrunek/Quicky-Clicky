import type { EvaluateReactionFunction } from '@/hooks/useGameState';

import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';

import FloatingBackButton from '@/components/FloatingBackButton';
import ResultsView from '@/components/ResultsView';
import SetupView from '@/components/SetupView';
import {
  DIGITS_STRINGS,
  POSSIBLE_FONT_FAMILIES,
  POSSIBLE_FONT_SIZES,
  POSSIBLE_FONT_WEIGHTS,
  UPPERCASE_ALPHABET,
} from '@/constants/constants';
import useGameState from '@/hooks/useGameState';
import { getRandomItem, getSymbolPair } from '@/utils/collection';

/* eslint-disable-next-line react-refresh/only-export-components */
const ClassMatching = () => {
  const [symbolPair, setSymbolPair] = useState<[string, string]>(['', '']);

  const evaluateReactionFn: EvaluateReactionFunction = useCallback(
    (time, confirmation) => {
      const symbolMatch = UPPERCASE_ALPHABET.includes(symbolPair[0])
        ? UPPERCASE_ALPHABET.includes(symbolPair[1])
        : DIGITS_STRINGS.includes(symbolPair[1]);

      return {
        falseStart: false,
        reactionTimeMs: time,
        intentMatch: symbolMatch,
        isCorrect: confirmation === symbolMatch,
      };
    },
    [symbolPair],
  );

  const { state, setupFn, startFn, restartFn } = useGameState(false, evaluateReactionFn);

  useLayoutEffect(() => {
    /* eslint-disable-next-line react-hooks/set-state-in-effect */
    setSymbolPair(getSymbolPair(state.results, state.setup.trialCount - state.currentTrial + 1));
  }, [state.setup, state.currentTrial, state.results]);

  /* eslint-disable react-hooks/exhaustive-deps */
  const templateSymbolStyle = useMemo(
    () => ({
      fontFamily: getRandomItem(POSSIBLE_FONT_FAMILIES),
      fontSize: getRandomItem(POSSIBLE_FONT_SIZES),
      fontWeight: getRandomItem(POSSIBLE_FONT_WEIGHTS),
    }),
    [state.currentTrial],
  );

  const compareSymbolStyle = useMemo(
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
        name="Class Matching"
        id="class-matching"
        results={state.results}
        restartFn={restartFn}
        includeDecission
      />
    );
  }

  return (
    <>
      <div className="flex min-h-screen w-full flex-col items-center justify-center">
        <div className="flex items-center justify-around gap-6 rounded-2xl border border-black/25 bg-black/25 px-6 py-4 shadow-md backdrop-blur-xs dark:border-white/50 dark:bg-white/25">
          <p style={templateSymbolStyle} className="mb-1 min-w-32 text-center text-white">
            {symbolPair[0]}
          </p>
          <div className="h-16 w-0.5 bg-white/50" />
          <p style={compareSymbolStyle} className="mb-1 min-w-32 text-center text-white">
            {state.reactionReady && symbolPair[1]}
          </p>
        </div>
      </div>
      <FloatingBackButton />
    </>
  );
};

export const Route = createFileRoute('/class-matching')({
  component: ClassMatching,
});
