import { createFileRoute } from '@tanstack/react-router';
import clsx from 'clsx';

import Card from '@/components/atoms/Card';
import CenterWrapper from '@/components/atoms/CenterWrapper';
import Text from '@/components/atoms/Text';
import ResultView from '@/components/organisms/ResultView';
import SetupView from '@/components/organisms/SetupView';
import useGameState from '@/hooks/useGameState';
import { tw } from '@/utils/string';

const baseClassName = tw`flex aspect-video w-3/5 items-center justify-center`;
const activeClassName = tw`bg-green-500!`;
const inactiveClassName = tw`bg-red-500!`;

/* eslint-disable-next-line react-refresh/only-export-components */
const SimpleReaction = () => {
  const { restartFn, setupFn, startFn, state } = useGameState(true);

  const style = clsx(baseClassName, state.reactionReady ? activeClassName : inactiveClassName);

  if (state.status === 'prep') {
    return <SetupView setup={state.setup} setupFn={setupFn} startFn={startFn} />;
  }

  if (state.status === 'dead') {
    return <ResultView name="Simple Reaction" restartFn={restartFn} results={state.results} />;
  }

  return (
    <CenterWrapper>
      <Card className={style}>
        {!state.reactionReady && (
          <Text as="h2" variant="subheading" className="font-[cursive] text-6xl!">
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
