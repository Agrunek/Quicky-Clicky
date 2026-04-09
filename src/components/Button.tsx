import clsx from 'clsx';

import { tw } from '@/utils/string';

interface ButtonProps {
  children?: React.ReactNode;
  type?: 'submit' | 'reset' | 'button';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

const buttonStyleBase = tw`min-w-60 rounded-xl bg-violet-600 px-6 py-2 text-center font-semibold text-white shadow-md transition duration-200 ease-in-out hover:bg-violet-700 focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:outline-none active:bg-violet-800 disabled:bg-slate-400`;

const Button = ({ className, ...props }: ButtonProps) => {
  const style = clsx(buttonStyleBase, className);

  return <button className={style} {...props} />;
};

export default Button;
