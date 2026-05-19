export type Theme = 'dark' | 'light' | 'system';

export const setTheme = (theme: Theme) => {
  switch (theme) {
    case 'dark':
      localStorage.theme = 'dark';
      break;
    case 'light':
      localStorage.theme = 'light';
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
