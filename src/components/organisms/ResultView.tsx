import type { TrialResult } from '@/hooks/useGameState';
import type { StoreName } from '@/store/IndexedDB';

import { useEffect } from 'react';

import Button from '@/components/atoms/Button';
import Card from '@/components/atoms/Card';
import CenterWrapper from '@/components/atoms/CenterWrapper';
import Text from '@/components/atoms/Text';
import { useNotiStack } from '@/contexts/NotiStackContext';
import { saveGameAttempt } from '@/store/IndexedDB';

interface ResultViewProps {
  id: string;
  includeDecission?: boolean;
  name: string;
  restartFn: () => void;
  results: TrialResult[];
  storeName: StoreName;
}

const sum = (arr: number[]) => arr.reduce((sum, val) => sum + val, 0);

const ResultView = ({ id, includeDecission, name, restartFn, results, storeName }: ResultViewProps) => {
  const { enqueue } = useNotiStack();

  const nonFalseStarts = results.filter((res) => !res.falseStart);
  const falseStartCount = results.length - nonFalseStarts.length;

  const times = nonFalseStarts.map((res) => res.reactionTimeMs);

  const meanTime = sum(times) / times.length || 0;
  const minTime = Math.min(...(times.length ? times : [0]));
  const maxTime = Math.max(...(times.length ? times : [0]));
  const sdTime = Math.sqrt(sum(times.map((time) => (time - meanTime) ** 2)) / times.length) || 0;

  const matches = nonFalseStarts.filter((res) => res.intentMatch === true);
  const totalMatchTime = sum(matches.map((res) => res.reactionTimeMs));
  const totalMatchErrors = matches.filter((res) => !res.isCorrect).length;

  const noMatches = nonFalseStarts.filter((res) => res.intentMatch === false);
  const totalNoMatchTime = sum(noMatches.map((res) => res.reactionTimeMs));
  const totalNoMatchErrors = noMatches.filter((res) => !res.isCorrect).length;

  const totalTime = totalMatchTime + totalNoMatchTime;
  const totalErrors = totalMatchErrors + totalNoMatchErrors;

  useEffect(() => {
    (async () => {
      const timestamp = await saveGameAttempt(storeName, id, results);

      if (isNaN(timestamp)) enqueue('Database has not started!', { duration: 3000, variant: 'warning' });
      else if (timestamp < 0) enqueue('Save operation failed for some reason!', { duration: 3000, variant: 'error' });
      else enqueue('Attempt has been saved!', { duration: 3000, variant: 'success' });
    })();
  }, [storeName, id, results, enqueue]);

  return (
    <CenterWrapper className="flex-col gap-10">
      <Text as="h1" variant="heading">
        {name} completed!
      </Text>
      <div className="flex items-center gap-4">
        <Text variant="heading" className="text-xl!">
          False starts: {falseStartCount}
        </Text>
        <Text variant="heading" className="text-xl!">
          Mean time: {meanTime.toFixed(2)} ms
        </Text>
        <Text variant="heading" className="text-xl!">
          Min time: {Math.trunc(minTime)} ms
        </Text>
        <Text variant="heading" className="text-xl!">
          Max time: {Math.trunc(maxTime)} ms
        </Text>
        <Text variant="heading" className="text-xl!">
          SD time: {sdTime.toFixed(2)} ms
        </Text>
      </div>
      {includeDecission && (
        <Card className="grid grid-cols-3 grid-rows-3 gap-4">
          <Text variant="subheading" className="font-extrabold!">
            Detailed results
          </Text>
          <Text variant="subheading" className="text-right">
            Time [{Math.trunc(totalTime)} ms]
          </Text>
          <Text variant="subheading" className="text-right">
            Errors [{totalErrors}]
          </Text>
          <Text variant="subheading">Match trials ({matches.length})</Text>
          <Text variant="subheading" className="text-right">
            {Math.trunc(totalMatchTime)} ms
          </Text>
          <Text variant="subheading" className="text-right">
            {totalMatchErrors}
          </Text>
          <Text variant="subheading">No-match trials ({noMatches.length})</Text>
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
