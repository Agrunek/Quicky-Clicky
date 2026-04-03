import { createFileRoute } from '@tanstack/react-router';
import useGameState from '@/hooks/useGameState';
import InitialSettings from '@/components/InitialSettings';

/* eslint-disable-next-line react-refresh/only-export-components */
const SimpleReaction = () => {
  const { state, setupFn, startFn } = useGameState(true);

  if (state.status === 'prep') {
    return (
      <InitialSettings
        triesCount={state.setup.trialCount}
        setTriesCount={(triesCount: number) => setupFn({ trialCount: triesCount, keyConfirm: state.setup.keyConfirm })}
        startGame={startFn}
      />
    );
  }

  return (
    <div className="text-3xl text-white">
      <p>Current state: {state.status}</p>
      <p>Numer of tries: {state.setup.trialCount}</p>
      <p>Current round: {state.currentTrial}</p>
      <p>Reaction ready: {state.reactionReady ? 'YES' : 'NO'}</p>
      <p>Results: {JSON.stringify(state.results)}</p>
    </div>
  );
};

export const Route = createFileRoute('/simple-reaction')({
  component: () => <SimpleReaction />,
});
