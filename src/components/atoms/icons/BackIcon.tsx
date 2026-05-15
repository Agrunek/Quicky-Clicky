import clsx from 'clsx';

import { tw } from '@/utils/string';

interface BackIconProps {
  className?: string;
  filled?: boolean;
}

const baseClassName = tw`size-8 text-white`;

const BackIcon = ({ className, filled }: BackIconProps) => {
  const style = clsx(baseClassName, className);

  if (filled) {
    return (
      <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={style}>
        <path
          clipRule="evenodd"
          d="M9.53 2.47a.75.75 0 0 1 0 1.06L4.81 8.25H15a6.75 6.75 0 0 1 0 13.5h-3a.75.75 0 0 1 0-1.5h3a5.25 5.25 0 1 0 0-10.5H4.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0Z"
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
      <path d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default BackIcon;
