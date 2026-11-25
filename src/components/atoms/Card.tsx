import clsx from 'clsx';

import { tw } from '@/utils/string';

interface CardProps {
  children?: React.ReactNode;
  className?: string;
}

const baseClassName = tw`rounded-[1.75rem] border border-app-card-border bg-app-card px-5 py-5 shadow-app-card backdrop-blur-xl`;

const Card = ({ children, className }: CardProps) => {
  const style = clsx(baseClassName, className);

  return <div className={style}>{children}</div>;
};

export default Card;
