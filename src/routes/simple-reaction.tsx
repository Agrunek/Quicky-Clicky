import { createFileRoute } from '@tanstack/react-router';
import clsx from 'clsx';

import FloatingBackButton from '@/components/FloatingBackButton';
import ResultsView from '@/components/ResultsView';
import SetupView from '@/components/SetupView';
import useGameState from '@/hooks/useGameState';
import { tw } from '@/utils/string';

const boxStyleBase = tw`flex w-full flex-1 items-center justify-center rounded-2xl shadow-md`;
const boxStyleWait = tw`bg-red-600`;
const boxStyleActive = tw`bg-green-500`;

/* eslint-disable-next-line react-refresh/only-export-components */
const SimpleReaction = () => {
  const { state, setupFn, startFn, restartFn } = useGameState(true);

  if (state.status === 'prep') {
    return <SetupView setup={state.setup} setupFn={setupFn} startFn={startFn} />;
  }

  if (state.status === 'dead') {
    return <ResultsView id="simple-reaction" name="Simple Reaction" restartFn={restartFn} results={state.results} />;
  }

  const boxStyle = clsx(boxStyleBase, state.reactionReady ? boxStyleActive : boxStyleWait);

  return (
    <>
      <div className="flex min-h-screen w-full flex-col items-center justify-center p-32">
        <div className={boxStyle}>
          {!state.reactionReady && <p className="text-4xl font-bold text-white">Wait for green...</p>}
        </div>
      </div>
      <FloatingBackButton />
    </>
  );
};

export const Route = createFileRoute('/simple-reaction')({
  component: () => <SimpleReaction />,
});
