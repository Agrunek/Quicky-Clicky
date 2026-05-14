import { useEffect, useState } from 'react';

import Router from './Router';
import CenterWrapper from './components/atoms/CenterWrapper';
import Text from './components/atoms/Text';

const App = () => {
  const [keyPressed, setKeyPressed] = useState(false);

  useEffect(() => {
    if (keyPressed) return;

    const keydownHandler = () => setKeyPressed(true);
    window.addEventListener('keydown', keydownHandler);

    return () => window.removeEventListener('keydown', keydownHandler);
  }, [keyPressed]);

  if (keyPressed) return <Router />;

  return (
    <CenterWrapper>
      <Text as="h2" variant="heading" className="tracking-widest italic">
        Press any key to continue...
      </Text>
    </CenterWrapper>
  );
};

export default App;
