import type { ClassNameDictionary } from '@/utils/string';

import clsx from 'clsx';

import { tw } from '@/utils/string';

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
const ACCEPTED_ELEMENTS = ['h1', 'h2', 'h3', 'p', 'span'] as const satisfies readonly React.ElementType[];

interface TextProps {
  as?: (typeof ACCEPTED_ELEMENTS)[number];
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  variant?: TextVariant;
}

type TextVariant = 'heading' | 'paragraph' | 'subheading';

const baseClassName = tw`oldstyle-nums slashed-zero`;

const variantClassNames: ClassNameDictionary<TextVariant> = {
  heading: tw`text-3xl font-extrabold tracking-tight text-app-ink`,
  paragraph: tw`text-base leading-relaxed font-normal text-app-body`,
  subheading: tw`text-xl font-semibold tracking-tight text-app-heading`,
};

const Text = ({ as: Element = 'p', className, variant = 'paragraph', ...props }: TextProps) => {
  const style = clsx(baseClassName, variantClassNames[variant], className);

  return <Element className={style} {...props} />;
};

export default Text;
