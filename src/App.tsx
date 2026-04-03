import { useEffect, useState } from 'react';
import Router from './Router';

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
    <div className="flex min-h-screen w-full items-center justify-center">
      <p className="text-2xl font-bold text-white">Press any key to continue...</p>
    </div>
  );
};

export default App;
