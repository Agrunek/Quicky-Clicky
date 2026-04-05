import type { GameSetup } from '@/hooks/useGameState';

import Input from '@/components/Input';
import KeybindInput from '@/components/KeybindInput';

interface SetupViewProps {
  setup: GameSetup;
  setupFn: (setup: GameSetup) => void;
  startFn: () => void;
  includeKeyDeny?: boolean;
  includeNumberOfItems?: boolean;
}

const SetupView = ({ setup, setupFn, startFn, includeKeyDeny, includeNumberOfItems }: SetupViewProps) => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
      <div className="flex min-w-60 flex-col gap-4 rounded-2xl border border-white/50 bg-white/25 p-6 pt-4 shadow-md backdrop-blur-xs">
        <Input
          type="number"
          label="Trial count"
          name="trial-count"
          value={setup.trialCount}
          onChange={(e) => setupFn({ ...setup, trialCount: Math.max(e.target.valueAsNumber || 1, 1) })}
        />
        <KeybindInput
          label="Match key"
          name="match-key"
          keybind={setup.keyConfirm}
          setKeybind={(key) => setupFn({ ...setup, keyConfirm: key })}
        />
        {includeKeyDeny && (
          <KeybindInput
            label="No-match key"
            name="no-match-key"
            keybind={setup.keyDeny}
            setKeybind={(key) => setupFn({ ...setup, keyDeny: key })}
          />
        )}
        {includeNumberOfItems && (
          <Input
            type="number"
            label="Number of items"
            name="number-of-items"
            value={setup.numberOfItems || 0}
            onChange={(e) => setupFn({ ...setup, numberOfItems: e.target.valueAsNumber || 0 })}
          />
        )}
      </div>
      <button
        type="button"
        disabled={(includeKeyDeny && !setup.keyDeny) || (includeNumberOfItems && !setup.numberOfItems)}
        onClick={startFn}
        className="mt-6 min-w-60 rounded-xl bg-violet-600 px-6 py-2 font-semibold text-white shadow-md transition duration-200 ease-in-out hover:bg-violet-700 focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:outline-none active:bg-violet-800 disabled:bg-slate-400"
      >
        START
      </button>
    </div>
  );
};

export default SetupView;
