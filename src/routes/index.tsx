import { createFileRoute } from '@tanstack/react-router';
import Link from '@/components/Link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

/* eslint-disable-next-line react-refresh/only-export-components */
const Index = () => {
  return (
    <>
      <Header />
      <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4">
        <Link to="/simple-reaction">Simple Reaction</Link>
        <Link to="/physical-matching">Physical Matching</Link>
        <Link to="/name-matching">Name Matching</Link>
        <Link to="/class-matching">Class Matching</Link>
        <Link to="/visual-search">Visual Search</Link>
      </div>
      <Footer />
    </>
  );
};

export const Route = createFileRoute('/')({
  component: () => <Index />,
});
