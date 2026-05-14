import type { ClassNameDictionary } from '@/utils/string';

import clsx from 'clsx';

import { tw } from '@/utils/string';

type ButtonVariant = 'primary' | 'headless';

interface ButtonProps {
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  variant?: ButtonVariant;
}

const baseClassName = tw`cursor-pointer disabled:cursor-not-allowed`;

const variantClassNames: ClassNameDictionary<ButtonVariant> = {
  primary: tw`relative z-10 overflow-hidden rounded-xl bg-mauve-800 px-6 py-3 text-lg font-bold text-white shadow-md shadow-zinc-200/10 text-shadow-sm/20 text-shadow-stone-800 *:relative *:z-10 not-disabled:before:absolute not-disabled:before:inset-0 not-disabled:before:z-0 not-disabled:before:origin-bottom-left not-disabled:before:translate-y-full not-disabled:before:scale-x-0 not-disabled:before:scale-y-200 not-disabled:before:-rotate-45 not-disabled:before:bg-conic/decreasing not-disabled:before:from-violet-700 not-disabled:before:via-lime-300 not-disabled:before:to-violet-700 not-disabled:before:transition-transform not-disabled:before:duration-300 not-disabled:before:ease-out not-disabled:before:content-[''] not-disabled:hover:before:translate-y-1/2 not-disabled:hover:before:scale-x-100 not-disabled:hover:before:rotate-0 not-disabled:active:scale-95 disabled:bg-zinc-500`,
  headless: tw``,
};

const Button = ({ children, className, disabled, onClick, variant = 'primary' }: ButtonProps) => {
  const style = clsx(baseClassName, variantClassNames[variant], className);

  return (
    <button disabled={disabled} onClick={onClick} className={style}>
      <span>{children}</span>
    </button>
  );
};

export default Button;
