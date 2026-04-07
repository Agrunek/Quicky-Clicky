import type { GameSetup } from '@/hooks/useGameState';

import Input from '@/components/Input';
import KeybindInput from '@/components/KeybindInput';
import Checkbox from '@/components/Checkbox';
import Button from '@/components/Button';
import { POSSIBLE_ITEMS_COMBINATIONS } from '@/constants/constants';

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
          value={setup.trialCount || ''}
          onChange={(e) => setupFn({ ...setup, trialCount: Math.max(e.target.valueAsNumber || 0, 0) })}
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
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-white text-shadow-xs">Number of items</p>
            <div className="flex gap-2">
              {POSSIBLE_ITEMS_COMBINATIONS.map((n) => (
                <Checkbox
                  key={n}
                  label={n.toString()}
                  name={n.toString()}
                  checked={setup.numberOfItems === n}
                  onCheck={(checked) => setupFn({ ...setup, numberOfItems: checked ? n : 0 })}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <Button
        type="button"
        disabled={
          !setup.trialCount || (includeKeyDeny && !setup.keyDeny) || (includeNumberOfItems && !setup.numberOfItems)
        }
        onClick={startFn}
        className="mt-6"
      >
        START
      </Button>
    </div>
  );
};

export default SetupView;
