import { useEffect, useState } from 'react';

interface KeybindInputProps {
  label: string;
  name: string;
  keybind?: string;
  setKeybind: (keybind: string) => void;
}

const KeybindInput = ({ label, name, keybind, setKeybind }: KeybindInputProps) => {
  const [listening, setListening] = useState(false);

  useEffect(() => {
    if (!listening) return;

    const keydownHandler = (e: KeyboardEvent) => {
      if (e.repeat) return;
      setKeybind(e.code);
      setListening(false);
    };

    window.addEventListener('keydown', keydownHandler);

    return () => window.removeEventListener('keydown', keydownHandler);
  }, [setKeybind, listening]);

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={`input-${name}`} className="font-semibold text-white text-shadow-xs">
        {label}
      </label>
      <button
        id={`input-${name}`}
        type="button"
        onFocus={() => setListening(true)}
        onMouseDown={() => setListening(true)}
        className="rounded-md border border-black/50 bg-white px-2 py-1"
      >
        {listening
          ? 'Press any key...'
          : keybind?.toUpperCase().replace('KEY', '').replace('DIGIT', '') || 'No keybind provided!'}
      </button>
    </div>
  );
};

export default KeybindInput;
