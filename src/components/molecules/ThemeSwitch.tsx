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

const baseClassName = tw`flex items-center gap-1 rounded-full border border-app-card-border bg-app-card p-1.5 shadow-app-theme backdrop-blur-lg *:size-10 *:rounded-full *:text-app-icon *:transition *:hover:bg-app-hover *:aria-checked:bg-app-selected`;

const ThemeSwitch = ({ className }: ThemeSwitchProps) => {
  const [checkedTheme, setCheckedTheme] = useState(() => getTheme());

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
        <SystemIcon filled={checkedTheme === 'system'} className="m-auto size-6! text-app-icon!" />
      </Button>
      <Button
        role="radio"
        aria-checked={checkedTheme === 'light'}
        onClick={() => updateTheme('light')}
        variant="headless"
      >
        <LightIcon filled={checkedTheme === 'light'} className="m-auto size-7! text-app-icon!" />
      </Button>
      <Button
        role="radio"
        aria-checked={checkedTheme === 'dark'}
        onClick={() => updateTheme('dark')}
        variant="headless"
      >
        <DarkIcon filled={checkedTheme === 'dark'} className="m-auto size-6! text-app-icon!" />
      </Button>
    </div>
  );
};

export default ThemeSwitch;
