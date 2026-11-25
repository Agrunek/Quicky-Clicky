import type { StoreEntry } from '@/store/IndexedDB';

import Button from '@/components/atoms/Button';
import Card from '@/components/atoms/Card';
import Text from '@/components/atoms/Text';
import DeleteIcon from '@/components/atoms/icons/DeleteIcon';
import { calculateStats } from '@/utils/collection';

interface HistoryItemProps {
  className?: string;
  expanded?: boolean;
  item: StoreEntry;
  onDelete?: () => void;
  onDetails?: () => void;
}

const HistoryItem = ({ className, expanded, item, onDelete, onDetails }: HistoryItemProps) => {
  const { falseStartCount, maxTime, meanTime, minTime, sdTime } = calculateStats(item.attempt);

  return (
    <div className={className}>
      <Card className="relative flex flex-col gap-4 pr-14 sm:pr-16">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <Text as="h2" variant="subheading" className="text-2xl!">
              {item.gameid}
            </Text>
            <Text className="opacity-80">{new Date(item.timestamp).toLocaleString()}</Text>
          </div>
          {onDetails && (
            <Button
              onClick={onDetails}
              variant="headless"
              className="shrink-0 rounded-full px-2.5 py-1 transition hover:bg-app-hover"
            >
              <Text className="text-sm! font-semibold! tracking-wide! text-app-label! hover:underline">Details...</Text>
            </Button>
          )}
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-2 sm:flex sm:flex-wrap sm:justify-between sm:gap-3">
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
        {onDelete && (
          <Button
            onClick={onDelete}
            variant="headless"
            className="absolute top-4 right-3 rounded-xl border border-app-danger-border bg-app-danger-surface p-2 text-app-danger transition hover:bg-app-danger-hover"
          >
            <DeleteIcon className="size-7! text-app-danger!" />
          </Button>
        )}
      </Card>
      {expanded && (
        <Card className="mx-3 rounded-t-none border-t-0 px-3! sm:mx-8">
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
                        <span
                          className={`font-semibold ${trial.isCorrect ? 'text-status-success' : 'text-status-error'}`}
                        >
                          {trial.intentMatch == trial.isCorrect ? 'Match' : 'No-match'}
                        </span>
                      </Text>
                    )}
                  </div>
                )}
              </div>
              <div className="my-2 h-0.5 w-full bg-app-divider" />
            </div>
          ))}
        </Card>
      )}
    </div>
  );
};

export default HistoryItem;
