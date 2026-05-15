import { createFileRoute } from '@tanstack/react-router';

import Card from '@/components/atoms/Card';
import CenterWrapper from '@/components/atoms/CenterWrapper';
import Link from '@/components/atoms/Link';
import Text from '@/components/atoms/Text';
import Explanation from '@/components/molecules/Explanation';

/* eslint-disable-next-line react-refresh/only-export-components */
const Index = () => {
  return (
    <CenterWrapper className="-mt-8 flex-col gap-6">
      <Text as="h1" variant="heading" className="font-[cursive] text-3xl!">
        Pick {}
        <span className="bg-linear-90/increasing from-violet-700 via-lime-300 to-violet-700 bg-clip-text text-5xl font-black tracking-widest text-transparent italic text-shadow-none text-stroke-light dark:text-stroke-dark">
          your
        </span>
        {} poison
      </Text>
      <Card className="flex w-80 flex-col gap-6 p-6!">
        <div className="flex items-center gap-4">
          <Link to="/simple-reaction" className="flex-1">
            Simple Reaction
          </Link>
          <Explanation title="Simple Reaction">
            <Text>
              A big <span className="font-bold text-red-500">red</span> box will appear in the centre of the screen.
              After a random delay, press the <span className="font-bold">chosen key</span> when the box turns {}
              <span className="font-bold text-green-500">green</span>. You can also use your {}
              <span className="font-bold">mouse</span> to respond.
            </Text>
          </Explanation>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/physical-matching" className="flex-1">
            Physical Matching
          </Link>
          <Explanation title="Physical Matching">
            <Text>
              First, you will see a <span className="font-bold">five-letter word</span>. Then a second five-letter word
              will appear, and you must decide whether the two words are the same. Both words are presented in {}
              <span className="font-bold">lowercase</span>. Press the correct key based on the {}
              <span className="font-bold">match</span> and <span className="font-bold">no-match</span> keys you have
              chosen.
            </Text>
          </Explanation>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/name-matching" className="flex-1">
            Name Matching
          </Link>
          <Explanation title="Name Matching">
            <Text>
              First, you will see a <span className="font-bold">five-letter word</span>. Then a second five-letter word
              will appear, and you must decide whether the two words are the same. Both words are presented in {}
              <span className="font-bold">lowercase</span>. However their {}
              <span className="font-bold">style is random</span>. Press the correct key based on the {}
              <span className="font-bold">match</span> and <span className="font-bold">no-match</span> keys you have
              chosen.
            </Text>
          </Explanation>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/class-matching" className="flex-1">
            Class Matching
          </Link>
          <Explanation title="Class Matching">
            <Text>
              First, you will see a <span className="font-bold">letter or digit</span>. Then a second symbol will
              appear, and you must decide whether the two symbols are both {}
              <span className="font-bold">letters or digits</span>. The letters are {}
              <span className="font-bold">uppercase</span>. However their {}
              <span className="font-bold">style is random</span>. Press the correct key based on the {}
              <span className="font-bold">match</span> and <span className="font-bold">no-match</span> keys you have
              chosen. To avoid confusion, <span className="font-bold">0 (digit)</span> and {}
              <span className="font-bold">O (letter)</span> are not included, nor are {}
              <span className="font-bold">1 (digit)</span> and <span className="font-bold">I (letter)</span>.
            </Text>
          </Explanation>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/visual-search" className="flex-1">
            Visual Search
          </Link>
          <Explanation title="Visual Search">
            <Text>
              First, you will see an <span className="font-bold">uppercase letter</span> and an {}
              <span className="font-bold">empty grid</span> of the selected size. Then the grid will be filled with {}
              <span className="font-bold">random letters</span>, and you must decide whether the letter is present in
              the grid. Press the correct key based on the <span className="font-bold">match</span> and {}
              <span className="font-bold">no-match</span> keys you have chosen.
            </Text>
          </Explanation>
        </div>
      </Card>
    </CenterWrapper>
  );
};

export const Route = createFileRoute('/')({
  component: () => <Index />,
});
