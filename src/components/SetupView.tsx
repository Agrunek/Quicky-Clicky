// import type { GameSetup } from '@/hooks/useGameState';

// interface SetupViewProps {
//   setup: GameSetup;
//   setupFn: (setup: GameSetup) => void;
//   startFn: () => void;
// }

const SetupView = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="size-32 rounded-2xl border border-white/50 bg-white/25 shadow-md backdrop-blur-xs"></div>
    </div>
  );
};

export default SetupView;
