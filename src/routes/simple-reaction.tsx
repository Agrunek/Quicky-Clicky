import { createFileRoute } from '@tanstack/react-router';
import clsx from 'clsx';

import Card from '@/components/atoms/Card';
import CenterWrapper from '@/components/atoms/CenterWrapper';
import Text from '@/components/atoms/Text';
import ResultView from '@/components/organisms/ResultView';
import SetupView from '@/components/organisms/SetupView';
import useGameState from '@/hooks/useGameState';
import { SIMPLE_REACTION_STORE } from '@/store/IndexedDB';
import { tw } from '@/utils/string';

const baseClassName = tw`flex aspect-4/3 w-full items-center justify-center rounded-4xl sm:aspect-video sm:w-3/4 lg:w-3/5`;
const activeClassName = tw`bg-game-ready!`;
const inactiveClassName = tw`bg-game-waiting!`;

/* eslint-disable-next-line react-refresh/only-export-components */
const SimpleReaction = () => {
  const { restartFn, setupFn, startFn, state } = useGameState(true);

  const style = clsx(baseClassName, state.reactionReady ? activeClassName : inactiveClassName);

  if (state.status === 'prep') {
    return <SetupView setup={state.setup} setupFn={setupFn} startFn={startFn} />;
  }

  if (state.status === 'dead') {
    return (
      <ResultView
        id="simple-reaction"
        name="Simple Reaction"
        restartFn={restartFn}
        results={state.results}
        storeName={SIMPLE_REACTION_STORE}
      />
    );
  }

  return (
    <CenterWrapper>
      <Card className={`border-app-card-border p-6! shadow-app-card ${style}`}>
        {!state.reactionReady && (
          <Text variant="subheading" className="text-4xl! font-extrabold! text-white! drop-shadow sm:text-6xl!">
            Ready?
          </Text>
        )}
      </Card>
    </CenterWrapper>
  );
};

export const Route = createFileRoute('/simple-reaction')({
  component: () => <SimpleReaction />,
});
