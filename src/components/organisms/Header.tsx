import { useMatches } from '@tanstack/react-router';

import Link from '@/components/atoms/Link';
import BackNavigationButton from '@/components/molecules/BackNavigationButton';
import ThemeSwitch from '@/components/molecules/ThemeSwitch';

const Header = () => {
  const routeId = useMatches({ select: (matches) => matches.at(-1)?.routeId });

  if (routeId === '__root__') return null;

  return (
    <header className="fixed top-0 flex h-24 w-full items-center justify-between px-6 py-4">
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
