import type { StoreEntry } from '@/store/IndexedDB';

import Button from '@/components/atoms/Button';
import Card from '@/components/atoms/Card';
import Text from '@/components/atoms/Text';

interface HistoryItemProps {
  className?: string;
  expanded?: boolean;
  item: StoreEntry;
  onDetailsPressed?: () => void;
}

const sum = (arr: number[]) => arr.reduce((sum, val) => sum + val, 0);

const HistoryItem = ({ className, expanded, item, onDetailsPressed }: HistoryItemProps) => {
  const nonFalseStarts = item.attempt.filter((res) => !res.falseStart);
  const falseStartCount = item.attempt.length - nonFalseStarts.length;

  const times = nonFalseStarts.map((res) => res.reactionTimeMs);

  const meanTime = sum(times) / times.length || 0;
  const minTime = Math.min(...(times.length ? times : [0]));
  const maxTime = Math.max(...(times.length ? times : [0]));
  const sdTime = Math.sqrt(sum(times.map((time) => (time - meanTime) ** 2)) / times.length) || 0;

  return (
    <div className={className}>
      <Card className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <Text as="h2" variant="subheading" className="text-2xl!">
              {item.gameid}
            </Text>
            <Text className="opacity-80">{new Date(item.timestamp).toLocaleString()}</Text>
          </div>
          <Button onClick={onDetailsPressed} variant="headless">
            <Text className="text-xl! font-semibold hover:underline">Details...</Text>
          </Button>
        </div>
        <div className="flex flex-wrap justify-between gap-3">
          <Text>
            False starts: <span className="font-semibold">{falseStartCount}</span>
          </Text>
          <Text>
            Mean time: <span className="font-semibold">{meanTime.toFixed(2)} ms</span>
          </Text>
          <Text>
            Min time: <span className="font-semibold">{Math.trunc(minTime)} ms</span>
          </Text>
          <Text>
            Max time: <span className="font-semibold">{Math.trunc(maxTime)} ms</span>
          </Text>
          <Text>
            SD time: <span className="font-semibold">{sdTime.toFixed(2)} ms</span>
          </Text>
        </div>
      </Card>
      {expanded && (
        <Card className="mx-8 rounded-t-none border-t-0">
          {item.attempt.map((trial, idx) => (
            <div key={idx} className="flex flex-col">
              <div className="flex items-center px-2">
                <Text variant="subheading" className="w-8">
                  {idx}.
                </Text>
                {trial.falseStart ? (
                  <Text>FALSE START</Text>
                ) : (
                  <div className="flex w-full justify-between">
                    <Text>
                      Reaction time: <span className="font-semibold">{trial.reactionTimeMs}&nbsp;ms</span>
                    </Text>
                    {item.parent !== 'SimpleReaction' && (
                      <Text>
                        Correct:&nbsp;
                        <span className="font-semibold">{trial.intentMatch ? 'Match' : 'No-match'}</span> |
                        Answered:&nbsp;
                        <span className={`font-semibold ${trial.isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                          {trial.intentMatch == trial.isCorrect ? 'Match' : 'No-match'}
                        </span>
                      </Text>
                    )}
                  </div>
                )}
              </div>
              <div className="my-2 h-0.5 w-full bg-white/50" />
            </div>
          ))}
        </Card>
      )}
    </div>
  );
};

export default HistoryItem;
