import type { GameState } from '@/types/GameState';

import { useReducer } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import InitialSettings from '@/components/InitialSettings';

interface GameInformation {
  gameState: GameState;
  triesCount: number;
  currentRound: number;
  isPressActive: boolean;
}

type GameAction =
  | { type: 'SET_TRIES_COUNT'; payload: number }
  | { type: 'START_GAME' }
  | { type: 'NEXT_ROUND' }
  | { type: 'ACTIVATE_PRESS' }
  | { type: 'DEACTIVATE_PRESS' }
  | { type: 'RESET_GAME' };

const DEFAULT_NUMBER_OF_TRIES = 5;

const INITIAL_GAME_INFORMATION: GameInformation = {
  gameState: 'prep',
  triesCount: DEFAULT_NUMBER_OF_TRIES,
  currentRound: 1,
  isPressActive: false,
};

const gameReducer = (state: GameInformation, action: GameAction): GameInformation => {
  switch (action.type) {
    case 'SET_TRIES_COUNT':
      return { ...state, triesCount: action.payload };

    case 'START_GAME':
      return { ...state, gameState: 'live' };

    case 'NEXT_ROUND':
      if (state.currentRound >= state.triesCount) {
        return { ...state, gameState: 'end' };
      } else {
        return { ...state, currentRound: state.currentRound + 1 };
      }

    case 'ACTIVATE_PRESS':
      return { ...state, isPressActive: true };

    case 'DEACTIVATE_PRESS':
      return { ...state, isPressActive: false };

    case 'RESET_GAME':
      return { ...INITIAL_GAME_INFORMATION, triesCount: state.triesCount };
  }
};

/* eslint-disable-next-line react-refresh/only-export-components */
const SimpleReaction = () => {
  const [game, updateGame] = useReducer(gameReducer, INITIAL_GAME_INFORMATION);

  if (game.gameState === 'prep') {
    return (
      <InitialSettings
        triesCount={game.triesCount}
        setTriesCount={(triesCount: number) => updateGame({ type: 'SET_TRIES_COUNT', payload: triesCount })}
        startGame={() => updateGame({ type: 'START_GAME' })}
      />
    );
  }

  return (
    <div>
      <p>Current state: {game.gameState}</p>
      <p>Numer of tries: {game.triesCount}</p>
      <p>Current round: {game.currentRound}</p>
      <p>Press active: {game.isPressActive ? 'YES' : 'NO'}</p>
      <button
        onClick={() => {
          if (game.gameState === 'end') {
            updateGame({ type: 'RESET_GAME' });
          } else if (game.isPressActive) {
            updateGame({ type: 'DEACTIVATE_PRESS' });
            updateGame({ type: 'NEXT_ROUND' });
          } else {
            updateGame({ type: 'ACTIVATE_PRESS' });
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
