import { createFileRoute } from '@tanstack/react-router';
import useGameState from '@/hooks/useGameState';
import InitialSettings from '@/components/InitialSettings';

/* eslint-disable-next-line react-refresh/only-export-components */
const SimpleReaction = () => {
  const [state, dispatch] = useGameState();

  if (state.gameTime === 'prep') {
    return (
      <InitialSettings
        triesCount={state.triesCount}
        setTriesCount={(triesCount: number) => dispatch({ type: 'SET_TRIES_COUNT', payload: triesCount })}
        startGame={() => dispatch({ type: 'START_GAME' })}
      />
    );
  }

  return (
    <div>
      <p>Current state: {state.gameTime}</p>
      <p>Numer of tries: {state.triesCount}</p>
      <p>Current round: {state.currentTrial}</p>
      <p>Reaction active: {state.reactionActive ? 'YES' : 'NO'}</p>
      <button
        onClick={() => {
          if (state.gameTime === 'end') {
            dispatch({ type: 'RESET_GAME' });
          } else if (state.reactionActive) {
            dispatch({ type: 'DEACTIVATE_REACTION' });
            dispatch({ type: 'NEXT_ROUND' });
          } else {
            dispatch({ type: 'ACTIVATE_REACTION' });
          }
        }}
      >
        NEXT
      </button>
    </div>
  );
};

export const Route = createFileRoute('/simple-reaction')({
  component: () => <SimpleReaction />,
});
