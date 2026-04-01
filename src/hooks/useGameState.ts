import { useEffect, useReducer, useRef } from 'react';

type GameTime = 'prep' | 'live' | 'end';

interface TrialRecordSuccess {
  isError: false;
  reactionTimeMs: number;
}

interface TrialRecordFail {
  isError: true;
}

type TrialRecord = TrialRecordSuccess | TrialRecordFail;

interface GameState {
  gameTime: GameTime;
  triesCount: number;
  currentTrial: number;
  reactionActive: boolean;
  results: TrialRecord[];
}

type GameAction =
  | { type: 'SET_TRIES_COUNT'; payload: number }
  | { type: 'START_GAME' }
  | { type: 'NEXT_ROUND' }
  | { type: 'ACTIVATE_REACTION' }
  | { type: 'DEACTIVATE_REACTION' }
  | { type: 'PUSH_RESULT'; payload: TrialRecord }
  | { type: 'RESET_GAME' };

const DEFAULT_TRIES_COUNT = 5;
const MIN_DELAY_MS = 1500;
const MAX_DELAY_MS = 4000;

const INITIAL_GAME_STATE: GameState = {
  gameTime: 'prep',
  triesCount: DEFAULT_TRIES_COUNT,
  currentTrial: 1,
  reactionActive: false,
  results: [],
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

    case 'PUSH_RESULT':
      return { ...state, results: [...state.results, action.payload] };

    case 'RESET_GAME':
      return { ...INITIAL_GAME_STATE, triesCount: state.triesCount };
  }
};

const useGameState = () => {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_GAME_STATE);

  const activationTimeRef = useRef<number>(null);

  useEffect(() => {
    const delay = Math.floor(Math.random() * (MAX_DELAY_MS - MIN_DELAY_MS)) + MIN_DELAY_MS;

    const timer = setTimeout(() => {
      if (state.gameTime === 'live') {
        dispatch({ type: 'ACTIVATE_REACTION' });
        activationTimeRef.current = performance.now();
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [state.gameTime, state.currentTrial]);

  const reactionHandler = () => {
    if (state.results.length >= state.currentTrial) {
      return;
    }

    if (!state.reactionActive || activationTimeRef.current === null) {
      dispatch({ type: 'PUSH_RESULT', payload: { isError: true } });
      return;
    }

    const reactionTime = performance.now() - activationTimeRef.current;
    dispatch({ type: 'PUSH_RESULT', payload: { isError: false, reactionTimeMs: reactionTime } });
  };

  return { gameState: state, execute: dispatch, reactionHandler };
};

export default useGameState;
