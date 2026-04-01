import { createFileRoute } from '@tanstack/react-router';
import useGameState from '@/hooks/useGameState';
import InitialSettings from '@/components/InitialSettings';

/* eslint-disable-next-line react-refresh/only-export-components */
const SimpleReaction = () => {
  const { gameState, execute, reactionHandler } = useGameState();

  if (gameState.gameTime === 'prep') {
    return (
      <InitialSettings
        triesCount={gameState.triesCount}
        setTriesCount={(triesCount: number) => execute({ type: 'SET_TRIES_COUNT', payload: triesCount })}
        startGame={() => execute({ type: 'START_GAME' })}
      />
    );
  }

  return (
    <div>
      <p>Current state: {gameState.gameTime}</p>
      <p>Numer of tries: {gameState.triesCount}</p>
      <p>Current round: {gameState.currentTrial}</p>
      <p>Reaction active: {gameState.reactionActive ? 'YES' : 'NO'}</p>
      <p>Results: {JSON.stringify(gameState.results)}</p>
      <button
        onClick={() => {
          if (gameState.gameTime === 'end') {
            execute({ type: 'RESET_GAME' });
          } else if (gameState.reactionActive) {
            execute({ type: 'DEACTIVATE_REACTION' });
            execute({ type: 'NEXT_ROUND' });
          }
        }}
      >
        NEXT
      </button>
      <button onClick={() => reactionHandler()}>REACT</button>
    </div>
  );
};

export const Route = createFileRoute('/simple-reaction')({
  component: () => <SimpleReaction />,
});
