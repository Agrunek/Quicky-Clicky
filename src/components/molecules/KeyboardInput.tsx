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

const buttonBaseClassName = tw`relative min-h-12 rounded-2xl border border-app-border bg-app-control px-4 py-3 pr-12 text-left text-app-ink shadow-sm transition hover:border-app-accent`;
const buttonListeningClassName = tw`ring-4 ring-app-accent/20`;

const KeyboardInput = ({ className, label, name, onChange, value }: KeyboardInputProps) => {
  const [listening, setListening] = useState(false);

  const style = clsx(baseClassName, className);
  const buttonStyle = clsx(buttonBaseClassName, listening && buttonListeningClassName);

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
        className="mb-1 ml-1 w-fit text-xs font-bold tracking-[0.12em] text-app-label uppercase"
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
        className={buttonStyle}
      >
        {listening
          ? 'Press any key...'
          : value?.toUpperCase().replace('KEY', '').replace('DIGIT', '') || 'No key provided!'}
        <EnterIcon className="absolute top-2.5 right-3 size-7! text-app-label!" />
      </Button>
    </div>
  );
};

export default KeyboardInput;
