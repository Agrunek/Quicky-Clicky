import { useMatches } from '@tanstack/react-router';

import Link from '@/components/atoms/Link';
import BackNavigationButton from '@/components/molecules/BackNavigationButton';
import ThemeSwitch from '@/components/molecules/ThemeSwitch';

const Header = () => {
  const routeId = useMatches({ select: (matches) => matches.at(-1)?.routeId });

  if (routeId === '__root__') return null;

  return (
    <header className="fixed top-0 z-50 flex w-full items-center justify-between px-4 py-4 sm:px-7 sm:py-5">
      {routeId === '/' ? <ThemeSwitch /> : <BackNavigationButton />}
      {routeId === '/' && (
        <Link params={{ game: 'all' }} to="/history/$game">
          Results
        </Link>
      )}
    </header>
  );
};

export default Header;
