import type { GameSetup } from '@/hooks/useGameState';

import Button from '@/components/atoms/Button';
import Card from '@/components/atoms/Card';
import CenterWrapper from '@/components/atoms/CenterWrapper';
import Input from '@/components/atoms/Input';
import RadioGroup from '@/components/atoms/RadioGroup';
import Text from '@/components/atoms/Text';
import KeyboardInput from '@/components/molecules/KeyboardInput';
import { POSSIBLE_ITEMS_COMBINATIONS } from '@/constants/constants';

interface SetupViewProps {
  setup: GameSetup;
  setupFn: (setup: GameSetup) => void;
  startFn: () => void;
  includeKeyDeny?: boolean;
  includeNumberOfItems?: boolean;
}

const SetupView = ({ setup, setupFn, startFn, includeKeyDeny, includeNumberOfItems }: SetupViewProps) => {
  const act = !setup.trialCount || (includeKeyDeny && !setup.keyDeny) || (includeNumberOfItems && !setup.numberOfItems);

  return (
    <CenterWrapper className="flex-col gap-6">
      <Text as="h1" variant="heading">
        Check your current settings:
      </Text>
      <Card className="flex w-80 flex-col items-center gap-4 py-6!">
        <Input
          name="trial-count"
          type="number"
          value={setup.trialCount || ''}
          label="Trial count"
          onChange={(e) => setupFn({ ...setup, trialCount: Math.max(e.target.valueAsNumber || 0, 0) })}
          className="w-full"
        />
        <KeyboardInput
          name="match-key"
          value={setup.keyConfirm}
          label="Match key"
          onChange={(key) => setupFn({ ...setup, keyConfirm: key })}
          className="w-full"
        />
        {includeKeyDeny && (
          <KeyboardInput
            name="no-match-key"
            value={setup.keyDeny}
            label="No-match key"
            onChange={(key) => setupFn({ ...setup, keyDeny: key })}
            className="w-full"
          />
        )}
        {includeNumberOfItems && (
          <RadioGroup
            name="number-of-items"
            value={setup.numberOfItems}
            label="Grid size"
            onChange={(e) => setupFn({ ...setup, numberOfItems: Number(e.target.value) })}
            schema={POSSIBLE_ITEMS_COMBINATIONS}
            className="w-full"
          />
        )}
        <Button disabled={act} onClick={startFn} className="mt-4 w-50">
          Let's go!
        </Button>
      </Card>
    </CenterWrapper>
  );
};

export default SetupView;
