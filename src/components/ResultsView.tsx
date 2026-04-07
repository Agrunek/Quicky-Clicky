import type { TrialResult } from '@/hooks/useGameState';

import Button from '@/components/Button';

interface ResultsViewProps {
  name: string;
  id: string;
  results: TrialResult[];
  restartFn: () => void;
  includeDecission?: boolean;
}

const ResultsView = ({ name, results, restartFn, includeDecission }: ResultsViewProps) => {
  const nonFalseStartResults = results.filter((result) => !result.falseStart);
  const mappedTimes = nonFalseStartResults.map((result) => result.reactionTimeMs);

  const falseStartCount = results.length - nonFalseStartResults.length;
  const meanTime = mappedTimes.reduce((sum, time) => sum + time, 0) / nonFalseStartResults.length || 0;
  const minTime = Math.min(...(mappedTimes.length === 0 ? [0] : mappedTimes));
  const maxTime = Math.max(...(mappedTimes.length === 0 ? [0] : mappedTimes));

  const squarredDistances = mappedTimes.map((time) => (time - meanTime) ** 2);
  const sdTime = Math.sqrt(squarredDistances.reduce((sum, value) => sum + value, 0) / nonFalseStartResults.length) || 0;

  const matchResults = nonFalseStartResults.filter((result) => result.intentMatch === true);
  const noMatchResults = nonFalseStartResults.filter((result) => result.intentMatch === false);

  const matchCount = matchResults.length;
  const totalMatchTime = matchResults.reduce((sum, result) => sum + result.reactionTimeMs, 0);
  const totalMatchErrors = matchResults.filter((result) => result.isCorrect === false).length;

  const noMatchCount = noMatchResults.length;
  const totalNoMatchTime = noMatchResults.reduce((sum, result) => sum + result.reactionTimeMs, 0);
  const totalNoMatchErrors = noMatchResults.filter((result) => result.isCorrect === false).length;

  const totalTime = totalMatchTime + totalNoMatchTime;
  const totalErrors = totalMatchErrors + totalNoMatchErrors;

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-10">
      <p className="text-2xl font-bold text-white">{name} completed!</p>
      <div className="flex items-center gap-4">
        <p className="text-lg font-bold text-white">False starts: {falseStartCount}</p>
        <p className="text-lg font-bold text-white">Mean time: {meanTime} ms</p>
        <p className="text-lg font-bold text-white">Min time: {minTime} ms</p>
        <p className="text-lg font-bold text-white">Max time: {maxTime} ms</p>
        <p className="text-lg font-bold text-white">SD time: {sdTime.toFixed(2)} ms</p>
      </div>
      {includeDecission && (
        <>
          <div className="grid grid-cols-3 grid-rows-3 gap-x-6 gap-y-2 rounded-2xl border border-white/50 bg-white/25 p-4 shadow-md backdrop-blur-xs">
            <p className="font-bold text-white">Results</p>
            <p className="font-bold text-white">Time [{totalTime} ms]</p>
            <p className="font-bold text-white">Errors [{totalErrors}]</p>
            <p className="text-white">Match trials ({matchCount})</p>
            <p className="text-white">{totalMatchTime} ms</p>
            <p className="text-white">{totalMatchErrors}</p>
            <p className="text-white">No-match trials ({noMatchCount})</p>
            <p className="text-white">{totalNoMatchTime} ms</p>
            <p className="text-white">{totalNoMatchErrors}</p>
          </div>
        </>
      )}
      <Button type="button" onClick={restartFn}>
        RESTART
      </Button>
    </div>
  );
};

export default ResultsView;
