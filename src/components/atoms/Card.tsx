import clsx from 'clsx';

import { tw } from '@/utils/string';

interface CardProps {
  children?: React.ReactNode;
  className?: string;
}

const baseClassName = tw`rounded-xl border-2 border-white bg-black/60 px-6 py-4 shadow-md shadow-zinc-200/10 backdrop-blur-lg backdrop-saturate-200 dark:bg-black/30`;

const Card = ({ children, className }: CardProps) => {
  const style = clsx(baseClassName, className);

  return <div className={style}>{children}</div>;
};

export default Card;
