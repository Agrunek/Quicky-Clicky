import { useEffect, useReducer, useRef } from 'react';

type GameStatus = 'prep' | 'live' | 'dead';

export interface GameSetup {
  trialCount: number;
  keyConfirm: string;
  keyDeny?: string;
  numberOfItems?: number;
}

interface TrialResultFalseStart {
  falseStart: true;
}

interface TrialResultStandard {
  falseStart: false;
  reactionTimeMs: number;
  intentMatch?: boolean;
  isCorrect?: boolean;
}

export type TrialResult = TrialResultFalseStart | TrialResultStandard;

interface GameState {
  status: GameStatus;
  setup: GameSetup;
  currentTrial: number;
  reactionReady: boolean;
  results: TrialResult[];
}

type GameAction =
  | { type: 'SETUP'; payload: GameSetup }
  | { type: 'START' }
  | { type: 'NEXT' }
  | { type: 'ACTIVATE' }
  | { type: 'PUSH_RESULT'; payload: TrialResult }
  | { type: 'RESTART' };

export type EvaluateReactionFunction = (reactionTimeMs: number, confirmation?: boolean) => TrialResultStandard;

const DEFAULT_TRIAL_COUNT = 5;
const DEFAULT_KEY_CONFIRM = 'Space';
const DEFAULT_EVALUATION_FUNCTION: EvaluateReactionFunction = (time) => ({ falseStart: false, reactionTimeMs: time });
const MIN_DELAY_MS = 1500;
const MAX_DELAY_MS = 4000;

const INITIAL_GAME_STATE: GameState = {
  status: 'prep',
  setup: { trialCount: DEFAULT_TRIAL_COUNT, keyConfirm: DEFAULT_KEY_CONFIRM },
  currentTrial: 1,
  reactionReady: false,
  results: [],
};

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'SETUP':
      return { ...state, setup: { ...action.payload } };

    case 'START':
      return { ...state, status: 'live' };

    case 'NEXT':
      if (state.currentTrial >= state.setup.trialCount) {
        return { ...state, status: 'dead', reactionReady: false };
      } else {
        return { ...state, currentTrial: state.currentTrial + 1, reactionReady: false };
      }

    case 'ACTIVATE':
      return { ...state, reactionReady: true };

    case 'PUSH_RESULT':
      return { ...state, results: [...state.results, action.payload] };

    case 'RESTART':
      return { ...INITIAL_GAME_STATE, setup: { ...state.setup } };

    default:
      return state;
  }
};

const useGameState = (mouse: boolean = false, fn: EvaluateReactionFunction = DEFAULT_EVALUATION_FUNCTION) => {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_GAME_STATE);
  const reactionReadyTimestampRef = useRef<number | null>(null);
  const reactionConsumedRef = useRef(false);
  const ignoreInputRef = useRef(true);

  useEffect(() => {
    const handleReaction = (confirmation?: boolean) => {
      if (state.status !== 'live' || ignoreInputRef.current) return;

      if (reactionConsumedRef.current) return;
      reactionConsumedRef.current = true;

      if (reactionReadyTimestampRef.current === null) {
        reactionReadyTimestampRef.current = null;
        dispatch({ type: 'PUSH_RESULT', payload: { falseStart: true } });
        dispatch({ type: 'NEXT' });
        return;
      }

      const reactionTimeMs = performance.now() - reactionReadyTimestampRef.current;
      reactionReadyTimestampRef.current = null;
      dispatch({ type: 'PUSH_RESULT', payload: fn(reactionTimeMs, confirmation) });
      dispatch({ type: 'NEXT' });
    };

    const clickHandler = mouse && (() => handleReaction());
    const keydownHandler = (e: KeyboardEvent) => {
      if (e.repeat) return;

      if (e.code === state.setup.keyConfirm || (state.setup.keyDeny && e.code === state.setup.keyDeny)) {
        handleReaction(e.code === state.setup.keyConfirm);
      }
    };

    if (clickHandler) window.addEventListener('click', clickHandler);
    window.addEventListener('keydown', keydownHandler);

    return () => {
      if (clickHandler) window.removeEventListener('click', clickHandler);
      window.removeEventListener('keydown', keydownHandler);
    };
  }, [mouse, fn, state.status, state.setup]);

  useEffect(() => {
    if (state.status !== 'live') return;

    const delay = Math.floor(Math.random() * (MAX_DELAY_MS - MIN_DELAY_MS + 1)) + MIN_DELAY_MS;
    reactionConsumedRef.current = false;

    const timer = setTimeout(() => {
      dispatch({ type: 'ACTIVATE' });
      requestAnimationFrame(() => {
        const { port1, port2 } = new MessageChannel();

        port1.onmessage = () => {
          port1.onmessage = null;
          port1.close();
          port2.close();
          reactionReadyTimestampRef.current = performance.now();
        };

        port2.postMessage(null);
      });
    }, delay);

    return () => clearTimeout(timer);
  }, [state.status, state.currentTrial]);

  const setupFn = (setup: GameSetup) => {
    if (state.status === 'prep') dispatch({ type: 'SETUP', payload: setup });
  };

  const startFn = () => {
    if (state.status === 'prep') {
      dispatch({ type: 'START' });

      setTimeout(() => {
        ignoreInputRef.current = false;
      }, 0);
    }
  };

  const restartFn = () => {
    reactionReadyTimestampRef.current = null;
    reactionConsumedRef.current = false;
    ignoreInputRef.current = true;
    dispatch({ type: 'RESTART' });
  };

  return { state, setupFn, startFn, restartFn };
};

export default useGameState;
