import type { ClassNameDictionary } from '@/utils/string';

import clsx from 'clsx';

import { tw } from '@/utils/string';

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
const ACCEPTED_ELEMENTS = ['h1', 'h2', 'h3', 'p', 'span'] as const satisfies readonly React.ElementType[];

type TextVariant = 'heading' | 'subheading' | 'paragraph';

interface TextProps {
  as?: (typeof ACCEPTED_ELEMENTS)[number];
  children?: React.ReactNode;
  className?: string;
  variant?: TextVariant;
}

const baseClassName = tw`oldstyle-nums slashed-zero`;

const variantClassNames: ClassNameDictionary<TextVariant> = {
  heading: tw`text-2xl font-extrabold text-black text-shadow-lg/50 text-shadow-zinc-200 dark:text-white dark:text-shadow-stone-800`,
  subheading: tw`text-xl font-semibold text-white text-shadow-sm/30 text-shadow-stone-800`,
  paragraph: tw`text-base font-normal text-white text-shadow-none`,
};

const Text = ({ as: Element = 'p', children, className, variant = 'paragraph' }: TextProps) => {
  const style = clsx(baseClassName, variantClassNames[variant], className);

  return <Element className={style}>{children}</Element>;
};

export default Text;
