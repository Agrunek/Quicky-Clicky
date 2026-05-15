import { useMatches } from '@tanstack/react-router';

import BackNavigationButton from '@/components/molecules/BackNavigationButton';
import ThemeSwitch from '@/components/molecules/ThemeSwitch';

const Header = () => {
  const routeId = useMatches({ select: (matches) => matches.at(-1)?.routeId });

  if (routeId === '__root__') return null;

  return (
    <header className="fixed top-0 flex h-24 w-full items-center px-6 py-4">
      {routeId === '/' ? <ThemeSwitch /> : <BackNavigationButton />}
    </header>
  );
};

export default Header;
