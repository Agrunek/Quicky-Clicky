import clsx from 'clsx';

import { tw } from '@/utils/string';

interface CenterWrapperProps {
  children?: React.ReactNode;
  className?: string;
}

const baseClassName = tw`flex min-h-screen w-screen items-center justify-center`;

const CenterWrapper = ({ children, className }: CenterWrapperProps) => {
  const style = clsx(baseClassName, className);

  return <div className={style}>{children}</div>;
};

export default CenterWrapper;
