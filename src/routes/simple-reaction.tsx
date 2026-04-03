import { createFileRoute } from '@tanstack/react-router';
import useGameState from '@/hooks/useGameState';
import SetupView from '@/components/SetupView';

/* eslint-disable-next-line react-refresh/only-export-components */
const SimpleReaction = () => {
  const { state, setupFn, startFn } = useGameState(true);

  if (state.status === 'prep') return <SetupView setup={state.setup} setupFn={setupFn} startFn={startFn} />;

  return null;
};

export const Route = createFileRoute('/simple-reaction')({
  component: () => <SimpleReaction />,
});
