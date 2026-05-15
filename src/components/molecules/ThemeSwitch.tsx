import type { Theme } from '@/utils/theme';

import { useState } from 'react';
import clsx from 'clsx';

import Button from '@/components/atoms/Button';
import DarkIcon from '@/components/atoms/icons/DarkIcon';
import LightIcon from '@/components/atoms/icons/LightIcon';
import SystemIcon from '@/components/atoms/icons/SystemIcon';
import { tw } from '@/utils/string';
import { getTheme, setTheme } from '@/utils/theme';

interface ThemeSwitchProps {
  className?: string;
}

const baseClassName = tw`flex items-center gap-2 rounded-full border-2 border-white bg-white/40 p-2 shadow-md shadow-zinc-200/10 backdrop-blur-lg backdrop-saturate-150 *:size-10 *:rounded-full *:bg-mauve-800/50 *:aria-checked:bg-mauve-800`;

const ThemeSwitch = ({ className }: ThemeSwitchProps) => {
  const [checkedTheme, setCheckedTheme] = useState(getTheme());

  const style = clsx(baseClassName, className);

  const updateTheme = (theme: Theme) => {
    setTheme(theme);
    setCheckedTheme(theme);
  };

  return (
    <div role="radiogroup" aria-label="Theme" className={style}>
      <Button
        role="radio"
        aria-checked={checkedTheme === 'system'}
        onClick={() => updateTheme('system')}
        variant="headless"
      >
        <SystemIcon filled={checkedTheme === 'system'} className="m-auto size-6!" />
      </Button>
      <Button
        role="radio"
        aria-checked={checkedTheme === 'light'}
        onClick={() => updateTheme('light')}
        variant="headless"
      >
        <LightIcon filled={checkedTheme === 'light'} className="m-auto size-7!" />
      </Button>
      <Button
        role="radio"
        aria-checked={checkedTheme === 'dark'}
        onClick={() => updateTheme('dark')}
        variant="headless"
      >
        <DarkIcon filled={checkedTheme === 'dark'} className="m-auto size-6!" />
      </Button>
    </div>
  );
};

export default ThemeSwitch;
