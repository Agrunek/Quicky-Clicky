export type Theme = 'light' | 'dark' | 'system';

export const setTheme = (theme: Theme) => {
  switch (theme) {
    case 'light':
      localStorage.theme = 'light';
      break;
    case 'dark':
      localStorage.theme = 'dark';
      break;
    case 'system':
      localStorage.removeItem('theme');
  }

  document.documentElement.classList.toggle(
    'dark',
    localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches),
  );
};

export const getTheme = (): Theme => {
  return localStorage.theme || 'system';
};
