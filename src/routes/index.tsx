import { createFileRoute } from '@tanstack/react-router';

import Link from '@/components/Link';

/* eslint-disable-next-line react-refresh/only-export-components */
const Index = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4">
      <Link to="/simple-reaction">Simple Reaction</Link>
      <Link to="/physical-matching">Physical Matching</Link>
      <Link to="/name-matching">Name Matching</Link>
    </div>
  );
};

export const Route = createFileRoute('/')({
  component: () => <Index />,
});
