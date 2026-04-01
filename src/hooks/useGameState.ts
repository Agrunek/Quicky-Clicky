import { useEffect, useReducer } from 'react';

type GameTime = 'prep' | 'live' | 'end';

interface GameState {
  gameTime: GameTime;
  triesCount: number;
  currentTrial: number;
  reactionActive: boolean;
}

type GameAction =
  | { type: 'SET_TRIES_COUNT'; payload: number }
  | { type: 'START_GAME' }
  | { type: 'NEXT_ROUND' }
  | { type: 'ACTIVATE_REACTION' }
  | { type: 'DEACTIVATE_REACTION' }
  | { type: 'RESET_GAME' };

const DEFAULT_TRIES_COUNT = 5;
const MIN_DELAY_MS = 1000;
const MAX_DELAY_MS = 4000;

const INITIAL_GAME_STATE: GameState = {
  gameTime: 'prep',
  triesCount: DEFAULT_TRIES_COUNT,
  currentTrial: 1,
  reactionActive: false,
};

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'SET_TRIES_COUNT':
      return { ...state, triesCount: action.payload };

    case 'START_GAME':
      return { ...state, gameTime: 'live' };

    case 'NEXT_ROUND':
      if (state.currentTrial >= state.triesCount) {
        return { ...state, gameTime: 'end' };
      } else {
        return { ...state, currentTrial: state.currentTrial + 1 };
      }

    case 'ACTIVATE_REACTION':
      return { ...state, reactionActive: true };

    case 'DEACTIVATE_REACTION':
      return { ...state, reactionActive: false };

    case 'RESET_GAME':
      return { ...INITIAL_GAME_STATE, triesCount: state.triesCount };
  }
};

const useGameState = () => {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_GAME_STATE);

  useEffect(() => {
    const delay = Math.floor(Math.random() * (MAX_DELAY_MS - MIN_DELAY_MS)) + MIN_DELAY_MS;

    const timer = setTimeout(() => {
      if (state.gameTime === 'live') {
        dispatch({ type: 'ACTIVATE_REACTION' });
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [state.gameTime, state.currentTrial]);

  return { state, dispatch };
};

export default useGameState;
