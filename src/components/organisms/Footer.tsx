import { useMatches } from '@tanstack/react-router';

import Card from '@/components/atoms/Card';
import Text from '@/components/atoms/Text';
import InfoIcon from '@/components/atoms/icons/InfoIcon';
import { APP_VERSION, SOURCE_URL } from '@/constants/constants';

const Footer = () => {
  const routeId = useMatches({ select: (matches) => matches.at(-1)?.routeId });

  if (routeId !== '/') return null;

  return (
    <footer className="fixed right-3 bottom-3 left-3 z-50 mx-auto flex max-w-6xl items-center justify-center sm:right-6 sm:bottom-5 sm:left-6">
      <Card className="flex w-full items-center gap-2 px-4! py-3! sm:max-w-lg">
        <InfoIcon filled className="size-6! shrink-0 text-app-label!" />
        <Text className="flex-1 text-xs! leading-snug! sm:text-sm!">
          This app is just a remake of the <span className="font-bold">ReactionTimeExperiment</span> app created by {}
          <span className="font-bold">Scott MacKenzie</span> and <span className="font-bold">Steven Castellucci</span>.
          All credit goes to them <span className="font-bold">&#10003;</span>
        </Text>
      </Card>
      <Text className="absolute left-0 hidden text-xs! text-app-footer-muted! xl:block">
        App version: {APP_VERSION}
      </Text>
      <Text className="absolute right-0 hidden max-w-64 text-right text-xs! break-all text-app-footer-muted! xl:block">
        {SOURCE_URL}
      </Text>
    </footer>
  );
};

export default Footer;
