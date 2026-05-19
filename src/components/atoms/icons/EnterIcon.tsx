import clsx from 'clsx';

import { tw } from '@/utils/string';

interface EnterIconProps {
  className?: string;
  filled?: boolean;
}

const baseClassName = tw`size-8 text-white`;

const EnterIcon = ({ className, filled }: EnterIconProps) => {
  const style = clsx(baseClassName, className);

  if (filled) {
    return (
      <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={style}>
        <path
          clipRule="evenodd"
          d="M20.239 3.749a.75.75 0 0 0-.75.75V15H5.549l2.47-2.47a.75.75 0 0 0-1.06-1.06l-3.75 3.75a.75.75 0 0 0 0 1.06l3.75 3.75a.75.75 0 1 0 1.06-1.06L5.55 16.5h14.69a.75.75 0 0 0 .75-.75V4.5a.75.75 0 0 0-.75-.751Z"
          fillRule="evenodd"
        />
      </svg>
    );
  }

  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={style}
    >
      <path d="m7.49 12-3.75 3.75m0 0 3.75 3.75m-3.75-3.75h16.5V4.499" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default EnterIcon;
