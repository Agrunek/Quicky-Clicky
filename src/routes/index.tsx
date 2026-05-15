import { createFileRoute } from '@tanstack/react-router';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Link from '@/components/atoms/Link';
import Explanation from '@/components/molecules/Explanation';

/* eslint-disable-next-line react-refresh/only-export-components */
const Index = () => {
  return (
    <>
      <Header />
      <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4">
        <div className="flex gap-3">
          <Link to="/simple-reaction">Simple Reaction</Link>
          <Explanation title="Simple Reaction">
            <p className="text-white">
              A big <span className="font-bold text-red-600">red</span> box will appear in the centre of the screen.
              After a random delay, press the <span className="font-bold">chosen key</span> when the box turns {}
              <span className="font-bold text-green-500">green</span>. You can also use Your {}
              <span className="font-bold">mouse</span> to respond.
            </p>
          </Explanation>
        </div>
        <div className="flex gap-3">
          <Link to="/physical-matching">Physical Matching</Link>
          <Explanation title="Physical Matching">
            <p className="text-white">
              First, You will see a <span className="font-bold">five-letter word</span>. Then a second five-letter word
              will appear, and You must decide whether the two words are the same. Both words are presented in {}
              <span className="font-bold">lowercase</span>. Press the correct key based on the {}
              <span className="font-bold">match</span> and <span className="font-bold">no-match</span> keys You have
              chosen.
            </p>
          </Explanation>
        </div>
        <div className="flex gap-3">
          <Link to="/name-matching">Name Matching</Link>
          <Explanation title="Name Matching">
            <p className="text-white">
              First, You will see a <span className="font-bold">five-letter word</span>. Then a second five-letter word
              will appear, and You must decide whether the two words are the same. Both words are presented in {}
              <span className="font-bold">lowercase</span>. However their {}
              <span className="font-bold">style is random</span>. Press the correct key based on the {}
              <span className="font-bold">match</span> and <span className="font-bold">no-match</span> keys You have
              chosen.
            </p>
          </Explanation>
        </div>
        <div className="flex gap-3">
          <Link to="/class-matching">Class Matching</Link>
          <Explanation title="Class Matching">
            <p className="text-white">
              First, You will see a <span className="font-bold">letter or digit</span>. Then a second symbol will
              appear, and You must decide whether the two symbols are both {}
              <span className="font-bold">letters or digits</span>. The letters are {}
              <span className="font-bold">uppercase</span>. However their {}
              <span className="font-bold">style is random</span>. Press the correct key based on the {}
              <span className="font-bold">match</span> and <span className="font-bold">no-match</span> keys You have
              chosen. To avoid confusion, <span className="font-bold">0 (digit)</span> and {}
              <span className="font-bold">O (letter)</span> are not included, nor are {}
              <span className="font-bold">1 (digit)</span> and <span className="font-bold">I (letter)</span>.
            </p>
          </Explanation>
        </div>
        <div className="flex gap-3">
          <Link to="/visual-search">Visual Search</Link>
          <Explanation title="Visual Search">
            <p className="text-white">
              First, you will see an <span className="font-bold">uppercase letter</span> and an {}
              <span className="font-bold">empty grid</span> of the selected size. Then the grid will be filled with {}
              <span className="font-bold">random letters</span>, and you must decide whether the letter is present in
              the grid. Press the correct key based on the <span className="font-bold">match</span> and {}
              <span className="font-bold">no-match</span> keys you have chosen.
            </p>
          </Explanation>
        </div>
      </div>
      <Footer />
    </>
  );
};

export const Route = createFileRoute('/')({
  component: () => <Index />,
});
