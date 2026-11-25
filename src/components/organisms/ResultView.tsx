import type { TrialResult } from '@/hooks/useGameState';
import type { StoreName } from '@/store/IndexedDB';

import { useEffect } from 'react';

import Button from '@/components/atoms/Button';
import Card from '@/components/atoms/Card';
import CenterWrapper from '@/components/atoms/CenterWrapper';
import Text from '@/components/atoms/Text';
import { useNotiStack } from '@/contexts/NotiStackContext';
import { saveGameAttempt } from '@/store/IndexedDB';
import { calculateStats } from '@/utils/collection';

interface ResultViewProps {
  id: string;
  includeDecission?: boolean;
  name: string;
  restartFn: () => void;
  results: TrialResult[];
  storeName: StoreName;
}

const ResultView = ({ id, includeDecission, name, restartFn, results, storeName }: ResultViewProps) => {
  const { enqueue } = useNotiStack();

  const {
    falseStartCount,
    matchesCount,
    maxTime,
    meanTime,
    minTime,
    noMatchesCount,
    sdTime,
    totalErrors,
    totalMatchErrors,
    totalMatchTime,
    totalNoMatchErrors,
    totalNoMatchTime,
    totalTime,
  } = calculateStats(results);

  useEffect(() => {
    (async () => {
      const timestamp = await saveGameAttempt(storeName, id, results);

      if (isNaN(timestamp)) enqueue('Database has not started!', { duration: 3000, variant: 'warning' });
      else if (timestamp < 0) enqueue('Save operation failed for some reason!', { duration: 3000, variant: 'error' });
      else enqueue('Attempt has been saved!', { duration: 3000, variant: 'success' });
    })();
  }, [storeName, id, results, enqueue]);

  return (
    <CenterWrapper className="flex-col gap-6 py-24 sm:gap-8">
      <Text as="h1" variant="heading" className="text-center text-2xl! sm:text-3xl!">
        {name} completed!
      </Text>
      <div className="grid w-full max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <Text
          variant="heading"
          className="flex items-center justify-center rounded-2xl border border-app-raised-border bg-app-raised p-3 text-center text-sm! shadow-sm sm:p-4 sm:text-base!"
        >
          False starts:
          <br />
          {falseStartCount}
        </Text>
        <Text
          variant="heading"
          className="flex items-center justify-center rounded-2xl border border-app-raised-border bg-app-raised p-3 text-center text-sm! shadow-sm sm:p-4 sm:text-base!"
        >
          Mean time:
          <br />
          {meanTime.toFixed(2)} ms
        </Text>
        <Text
          variant="heading"
          className="flex items-center justify-center rounded-2xl border border-app-raised-border bg-app-raised p-3 text-center text-sm! shadow-sm sm:p-4 sm:text-base!"
        >
          Min time:
          <br />
          {Math.trunc(minTime)} ms
        </Text>
        <Text
          variant="heading"
          className="flex items-center justify-center rounded-2xl border border-app-raised-border bg-app-raised p-3 text-center text-sm! shadow-sm sm:p-4 sm:text-base!"
        >
          Max time:
          <br />
          {Math.trunc(maxTime)} ms
        </Text>
        <Text
          variant="heading"
          className="flex items-center justify-center rounded-2xl border border-app-raised-border bg-app-raised p-3 text-center text-sm! shadow-sm sm:p-4 sm:text-base!"
        >
          SD time:
          <br />
          {sdTime.toFixed(2)} ms
        </Text>
      </div>
      {includeDecission && (
        <Card className="grid w-full max-w-2xl grid-cols-[minmax(0,1.3fr)_repeat(2,minmax(0,1fr))] gap-x-3 gap-y-4 sm:gap-x-6">
          <Text variant="subheading" className="font-extrabold!">
            Detailed results
          </Text>
          <Text variant="subheading" className="text-right">
            Time [{Math.trunc(totalTime)} ms]
          </Text>
          <Text variant="subheading" className="text-right">
            Errors [{totalErrors}]
          </Text>
          <Text variant="subheading">Match trials ({matchesCount})</Text>
          <Text variant="subheading" className="text-right">
            {Math.trunc(totalMatchTime)} ms
          </Text>
          <Text variant="subheading" className="text-right">
            {totalMatchErrors}
          </Text>
          <Text variant="subheading">No-match trials ({noMatchesCount})</Text>
          <Text variant="subheading" className="text-right">
            {Math.trunc(totalNoMatchTime)} ms
          </Text>
          <Text variant="subheading" className="text-right">
            {totalNoMatchErrors}
          </Text>
        </Card>
      )}
      <Button onClick={restartFn} className="w-50">
        Go again...
      </Button>
    </CenterWrapper>
  );
};

export default ResultView;
