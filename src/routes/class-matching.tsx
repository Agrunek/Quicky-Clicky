import type { EvaluateReactionFunction } from '@/hooks/useGameState';

import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';

import Card from '@/components/atoms/Card';
import CenterWrapper from '@/components/atoms/CenterWrapper';
import Text from '@/components/atoms/Text';
import ResultView from '@/components/organisms/ResultView';
import SetupView from '@/components/organisms/SetupView';
import { SIMPLE_ALPHABET, SIMPLE_DIGITS } from '@/constants/constants';
import useGameState from '@/hooks/useGameState';
import { CLASS_MATCHING_STORE } from '@/store/IndexedDB';
import { getRandomTextStyle, getSymbolPair } from '@/utils/collection';

/* eslint-disable-next-line react-refresh/only-export-components */
const ClassMatching = () => {
  const [symbolPair, setSymbolPair] = useState<[string, string]>(['', '']);

  const evaluateReactionFn: EvaluateReactionFunction = useCallback(
    (time, confirmation) => {
      const symbolMatch = SIMPLE_ALPHABET.includes(symbolPair[0])
        ? SIMPLE_ALPHABET.includes(symbolPair[1])
        : SIMPLE_DIGITS.includes(symbolPair[1]);

      return {
        falseStart: false,
        intentMatch: symbolMatch,
        isCorrect: confirmation === symbolMatch,
        reactionTimeMs: time,
      };
    },
    [symbolPair],
  );

  const { restartFn, setupFn, startFn, state } = useGameState(false, evaluateReactionFn);

  useLayoutEffect(() => {
    /* eslint-disable-next-line react-hooks/set-state-in-effect */
    setSymbolPair(getSymbolPair(state.results, state.setup.trialCount - state.currentTrial + 1));
  }, [state.setup, state.currentTrial, state.results]);

  /* eslint-disable react-hooks/exhaustive-deps */
  const templateSymbolStyle = useMemo(() => getRandomTextStyle(), [state.currentTrial]);
  const compareSymbolStyle = useMemo(() => getRandomTextStyle(), [state.currentTrial]);
  /* eslint-enable react-hooks/exhaustive-deps */

  if (state.status === 'prep') {
    return <SetupView includeKeyDeny setup={state.setup} setupFn={setupFn} startFn={startFn} />;
  }

  if (state.status === 'dead') {
    return (
      <ResultView
        name="Class Matching"
        includeDecission
        restartFn={restartFn}
        results={state.results}
        storeName={CLASS_MATCHING_STORE}
      />
    );
  }

  return (
    <CenterWrapper>
      <Card className="flex w-80 items-center justify-between gap-4 p-4">
        <Text variant="subheading" style={templateSymbolStyle} className="flex-1 text-center">
          {symbolPair[0]}
        </Text>
        <div className="h-16 w-0.5 bg-white/50" />
        <Text variant="subheading" style={compareSymbolStyle} className="flex-1 text-center">
          {state.reactionReady && symbolPair[1]}
        </Text>
      </Card>
    </CenterWrapper>
  );
};

export const Route = createFileRoute('/class-matching')({
  component: () => <ClassMatching />,
});
