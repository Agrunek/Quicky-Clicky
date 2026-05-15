import { useMatches } from '@tanstack/react-router';

import Card from '@/components/atoms/Card';
import Text from '@/components/atoms/Text';
import InfoIcon from '@/components/atoms/icons/InfoIcon';
import { APP_VERSION, SOURCE_URL } from '@/constants/constants';

const Footer = () => {
  const routeId = useMatches({ select: (matches) => matches.at(-1)?.routeId });

  if (routeId !== '/') return null;

  return (
    <footer className="fixed bottom-0 flex h-24 w-full items-center justify-between px-6 py-4">
      <Text className="flex-1 text-black/50! dark:text-white/50!">App version: {APP_VERSION}</Text>
      <Card className="flex w-150 items-center gap-4 px-4! py-2!">
        <InfoIcon filled />
        <Text className="flex-1">
          This app is just a remake of the <span className="font-bold">ReactionTimeExperiment</span> app created by {}
          <span className="font-bold">Scott MacKenzie</span> and <span className="font-bold">Steven Castellucci</span>.
          All credit goes to them <span className="font-bold">&#10003;</span>
        </Text>
      </Card>
      <Text className="flex-1 text-right text-black/50! dark:text-white/50!">{SOURCE_URL}</Text>
    </footer>
  );
};

export default Footer;
