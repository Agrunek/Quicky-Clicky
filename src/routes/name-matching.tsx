import type { EvaluateReactionFunction } from '@/hooks/useGameState';

import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';

import Card from '@/components/atoms/Card';
import CenterWrapper from '@/components/atoms/CenterWrapper';
import Text from '@/components/atoms/Text';
import ResultView from '@/components/organisms/ResultView';
import SetupView from '@/components/organisms/SetupView';
import useGameState from '@/hooks/useGameState';
import { NAME_MATCHING_STORE } from '@/store/IndexedDB';
import { getRandomTextStyle, getWordPair } from '@/utils/collection';

/* eslint-disable-next-line react-refresh/only-export-components */
const NameMatching = () => {
  const [wordPair, setWordPair] = useState<[string, string]>(['', '']);

  const evaluateReactionFn: EvaluateReactionFunction = useCallback(
    (time, confirmation) => ({
      falseStart: false,
      intentMatch: wordPair[0] === wordPair[1],
      isCorrect: confirmation === (wordPair[0] === wordPair[1]),
      reactionTimeMs: time,
    }),
    [wordPair],
  );

  const { restartFn, setupFn, startFn, state } = useGameState(false, evaluateReactionFn);

  useLayoutEffect(() => {
    /* eslint-disable-next-line react-hooks/set-state-in-effect */
    setWordPair(getWordPair(state.results, state.setup.trialCount - state.currentTrial + 1));
  }, [state.setup, state.currentTrial, state.results]);

  /* eslint-disable react-hooks/exhaustive-deps */
  const templateWordStyle = useMemo(() => getRandomTextStyle(), [state.currentTrial]);
  const compareWordStyle = useMemo(() => getRandomTextStyle(), [state.currentTrial]);
  /* eslint-enable react-hooks/exhaustive-deps */

  if (state.status === 'prep') {
    return <SetupView includeKeyDeny setup={state.setup} setupFn={setupFn} startFn={startFn} />;
  }

  if (state.status === 'dead') {
    return (
      <ResultView
        name="Physical Matching"
        includeDecission
        restartFn={restartFn}
        results={state.results}
        storeName={NAME_MATCHING_STORE}
      />
    );
  }

  return (
    <CenterWrapper>
      <Card className="flex w-80 items-center justify-between gap-4 p-4">
        <Text variant="subheading" style={templateWordStyle} className="flex-1 text-center">
          {wordPair[0]}
        </Text>
        <div className="h-16 w-0.5 bg-white/50" />
        <Text variant="subheading" style={compareWordStyle} className="flex-1 text-center">
          {state.reactionReady && wordPair[1]}
        </Text>
      </Card>
    </CenterWrapper>
  );
};

export const Route = createFileRoute('/name-matching')({
  component: () => <NameMatching />,
});
