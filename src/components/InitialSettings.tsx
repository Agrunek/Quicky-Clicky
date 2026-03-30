interface InitialSettingsProps {
  triesCount: number;
  setTriesCount: (triesCount: number) => void;
  startGame: () => void;
}

const InitialSettings = ({ triesCount, setTriesCount, startGame }: InitialSettingsProps) => {
  return (
    <div>
      <input
        type="number"
        value={triesCount}
        onChange={(e) => setTriesCount(Math.max(e.currentTarget.valueAsNumber, 0))}
      />
      <button onClick={startGame}>START</button>
    </div>
  );
};

export default InitialSettings;
