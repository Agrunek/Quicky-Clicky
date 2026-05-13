import type { Theme } from '@/utils/theme';

import { useState } from 'react';
import clsx from 'clsx';

import { getTheme, setTheme } from '@/utils/theme';

const Header = () => {
  const [currentTheme, setCurrentTheme] = useState(getTheme());

  const updateTheme = (theme: Theme) => {
    setTheme(theme);
    setCurrentTheme(theme);
  };

  return (
    <div className="fixed top-0 flex h-24 w-full items-start gap-8 px-8 pt-4">
      <fieldset className="flex gap-1 rounded-2xl border border-black/25 bg-black/25 p-1.5 text-white shadow-md backdrop-blur-xs dark:border-white/50 dark:bg-white/25">
        <label className={clsx('rounded-full p-2', currentTheme === 'system' && 'bg-black/25')}>
          <input
            name="theme"
            type="radio"
            value="system"
            checked={currentTheme === 'system'}
            onChange={() => updateTheme('system')}
            className="hidden"
          />
          <svg
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="size-6"
          >
            <path
              d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </label>
        <label className={clsx('rounded-full p-2', currentTheme === 'light' && 'bg-black/25')}>
          <input
            name="theme"
            type="radio"
            value="light"
            checked={currentTheme === 'light'}
            onChange={() => updateTheme('light')}
            className="hidden"
          />
          <svg
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="size-6"
          >
            <path
              d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </label>
        <label className={clsx('rounded-full p-2', currentTheme === 'dark' && 'bg-black/25')}>
          <input
            name="theme"
            type="radio"
            value="dark"
            checked={currentTheme === 'dark'}
            onChange={() => updateTheme('dark')}
            className="hidden"
          />
          <svg
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="size-6"
          >
            <path
              d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </label>
      </fieldset>
    </div>
  );
};

export default Header;
