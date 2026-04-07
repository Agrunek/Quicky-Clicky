import type { TrialResult } from '@/hooks/useGameState';

interface ResultsViewProps {
  name: string;
  id: string;
  results: TrialResult[];
  restartFn: () => void;
}

const ResultsView = ({ name, results, restartFn }: ResultsViewProps) => {
  const nonFalseStartResults = results.filter((result) => !result.falseStart);
  const mappedTimes = nonFalseStartResults.map((result) => result.reactionTimeMs);

  const falseStartCount = results.length - nonFalseStartResults.length;
  const meanTime = mappedTimes.reduce((sum, time) => sum + time, 0) / nonFalseStartResults.length || 0;
  const minTime = Math.min(...(mappedTimes.length === 0 ? [0] : mappedTimes));
  const maxTime = Math.max(...(mappedTimes.length === 0 ? [0] : mappedTimes));

  const squarredDistances = mappedTimes.map((time) => (time - meanTime) ** 2);
  const sdTime = Math.sqrt(squarredDistances.reduce((sum, value) => sum + value, 0) / nonFalseStartResults.length) || 0;

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-10">
      <p className="text-2xl font-bold text-white">{name} completed!</p>
      <div className="flex items-center gap-4">
        <p className="text-lg font-bold text-white">False starts: {falseStartCount}</p>
        <p className="text-lg font-bold text-white">Mean: {meanTime} ms</p>
        <p className="text-lg font-bold text-white">Min: {minTime} ms</p>
        <p className="text-lg font-bold text-white">Max: {maxTime} ms</p>
        <p className="text-lg font-bold text-white">SD: {sdTime.toFixed(2)} ms</p>
      </div>
      <button
        type="button"
        onClick={restartFn}
        className="min-w-60 rounded-xl bg-violet-600 px-6 py-2 font-semibold text-white shadow-md transition duration-200 ease-in-out hover:bg-violet-700 focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:outline-none active:bg-violet-800 disabled:bg-slate-400"
      >
        RESTART
      </button>
    </div>
  );
};

export default ResultsView;
