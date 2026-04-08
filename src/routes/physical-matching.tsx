import type { EvaluateReactionFunction } from '../hooks/useGameState';

import { useCallback, useEffect, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';

import useGameState from '@/hooks/useGameState';
import SetupView from '@/components/SetupView';
import ResultsView from '@/components/ResultsView';
import words from '@/constants/words.json' with { type: 'json' };

/* eslint-disable-next-line react-refresh/only-export-components */
const PhysicalMatching = () => {
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

  useEffect(() => {
    const templateWord = words[Math.floor(Math.random() * words.length)];

    const nonFalseStartResults = state.results.filter((result) => !result.falseStart);
    const matchCount = nonFalseStartResults.filter((result) => result.intentMatch === true).length;

    const originalMatchPossibilities = Math.ceil(nonFalseStartResults.length / 2);
    const matchChance = (originalMatchPossibilities - matchCount) / (state.setup.trialCount - state.currentTrial + 1);

    const sameWord = Math.random() < matchChance;
    const filteredWords = words.filter((word) => word !== templateWord);

    const compareWord = sameWord ? templateWord : filteredWords[Math.floor(Math.random() * filteredWords.length)];

    /* eslint-disable-next-line react-hooks/set-state-in-effect */
    setWordPair([templateWord, compareWord]);
  }, [state.setup, state.currentTrial, state.results]);

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
        <p className="mb-1 min-w-32 text-center text-4xl text-white">{wordPair[0]}</p>
        <div className="h-12 w-0.5 bg-white/50" />
        <p className="mb-1 min-w-32 text-center text-4xl text-white">{state.reactionReady && wordPair[1]}</p>
      </div>
    </div>
  );
};

export const Route = createFileRoute('/physical-matching')({
  component: PhysicalMatching,
});
