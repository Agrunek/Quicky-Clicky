import { useEffect, useState } from 'react';
import clsx from 'clsx';

import Button from '@/components/atoms/Button';
import EnterIcon from '@/components/atoms/icons/EnterIcon';
import { tw } from '@/utils/string';

interface KeyboardInputProps {
  className?: string;
  label: string;
  name: string;
  onChange: (key: string) => void;
  value?: string;
}

const baseClassName = tw`inline-flex flex-col`;

const KeyboardInput = ({ className, label, name, onChange, value }: KeyboardInputProps) => {
  const [listening, setListening] = useState(false);

  const style = clsx(baseClassName, className);

  useEffect(() => {
    if (!listening) return;

    const keydownHandler = (e: KeyboardEvent) => {
      e.preventDefault();

      if (e.repeat) return;

      if (e.code !== 'Escape') {
        onChange(e.code);
      }

      setListening(false);
    };

    window.addEventListener('keydown', keydownHandler);

    return () => window.removeEventListener('keydown', keydownHandler);
  }, [listening, onChange]);

  return (
    <div className={style}>
      <label
        htmlFor={`input-${name}`}
        className="ml-1.5 w-fit rounded-t-xl border-x-2 border-t-2 border-white bg-mauve-800 px-2.5 py-0.5 text-lg font-semibold text-white shadow-md shadow-zinc-200/10"
      >
        {label}
      </label>
      <Button
        id={`input-${name}`}
        name={name}
        value={value}
        role="button"
        aria-pressed={listening}
        onClick={() => setListening(true)}
        variant="headless"
        className="relative rounded-tl-md rounded-tr-xl rounded-b-xl border-2 border-white bg-mauve-800 px-4 py-2 text-left text-white shadow-md shadow-zinc-200/10"
      >
        {listening
          ? 'Press any key...'
          : value?.toUpperCase().replace('KEY', '').replace('DIGIT', '') || 'No key provided!'}
        <EnterIcon className="absolute top-1.5 right-3 size-7!" />
      </Button>
    </div>
  );
};

export default KeyboardInput;
