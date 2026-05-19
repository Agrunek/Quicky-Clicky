import { useEffect, useReducer, useRef } from 'react';

export type EvaluateReactionFunction = (reactionTimeMs: number, confirmation?: boolean) => TrialResultStandard;

export interface GameSetup {
  keyConfirm: string;
  keyDeny?: string;
  numberOfItems?: number;
  trialCount: number;
}

export type TrialResult = TrialResultFalseStart | TrialResultStandard;

type GameAction =
  | { payload: GameSetup; type: 'SETUP' }
  | { payload: TrialResult; type: 'PUSH_RESULT' }
  | { type: 'ACTIVATE' }
  | { type: 'NEXT' }
  | { type: 'RESTART' }
  | { type: 'START' };

interface GameState {
  currentTrial: number;
  reactionReady: boolean;
  results: TrialResult[];
  setup: GameSetup;
  status: GameStatus;
}

type GameStatus = 'dead' | 'live' | 'prep';

interface TrialResultFalseStart {
  falseStart: true;
}

interface TrialResultStandard {
  falseStart: false;
  intentMatch?: boolean;
  isCorrect?: boolean;
  reactionTimeMs: number;
}

const DEFAULT_TRIAL_COUNT = 5;
const DEFAULT_KEY_CONFIRM = 'Space';
const DEFAULT_EVALUATION_FUNCTION: EvaluateReactionFunction = (time) => ({ falseStart: false, reactionTimeMs: time });
const MIN_DELAY_MS = 1500;
const MAX_DELAY_MS = 4000;

const INITIAL_GAME_STATE: GameState = {
  currentTrial: 1,
  reactionReady: false,
  results: [],
  setup: { keyConfirm: DEFAULT_KEY_CONFIRM, trialCount: DEFAULT_TRIAL_COUNT },
  status: 'prep',
};

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'NEXT':
      if (state.currentTrial >= state.setup.trialCount) {
        return { ...state, reactionReady: false, status: 'dead' };
      } else {
        return { ...state, currentTrial: state.currentTrial + 1, reactionReady: false };
      }

    case 'ACTIVATE':
      return { ...state, reactionReady: true };

    case 'PUSH_RESULT':
      return { ...state, results: [...state.results, action.payload] };

    case 'RESTART':
      return { ...INITIAL_GAME_STATE, setup: { ...state.setup } };

    case 'SETUP':
      return { ...state, setup: { ...action.payload } };

    case 'START':
      return { ...state, status: 'live' };

    default:
      return state;
  }
};

const useGameState = (mouse: boolean = false, fn: EvaluateReactionFunction = DEFAULT_EVALUATION_FUNCTION) => {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_GAME_STATE);
  const reactionReadyTimestampRef = useRef<null | number>(null);
  const reactionConsumedRef = useRef(false);
  const ignoreInputRef = useRef(true);

  useEffect(() => {
    const handleReaction = (confirmation?: boolean) => {
      if (state.status !== 'live' || ignoreInputRef.current) return;

      if (reactionConsumedRef.current) return;
      reactionConsumedRef.current = true;

      if (reactionReadyTimestampRef.current === null) {
        reactionReadyTimestampRef.current = null;
        dispatch({ payload: { falseStart: true }, type: 'PUSH_RESULT' });
        dispatch({ type: 'NEXT' });
        return;
      }

      const reactionTimeMs = performance.now() - reactionReadyTimestampRef.current;
      reactionReadyTimestampRef.current = null;
      dispatch({ payload: fn(reactionTimeMs, confirmation), type: 'PUSH_RESULT' });
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
    if (state.status === 'prep') dispatch({ payload: setup, type: 'SETUP' });
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

  return { restartFn, setupFn, startFn, state };
};

export default useGameState;
