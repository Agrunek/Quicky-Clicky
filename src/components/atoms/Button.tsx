import type { ClassNameDictionary } from '@/utils/string';

import clsx from 'clsx';

import { tw } from '@/utils/string';

type ButtonVariant = 'primary' | 'headless';

interface ButtonProps extends React.AriaAttributes {
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  variant?: ButtonVariant;
  role?: React.AriaRole;
}

const baseClassName = tw`cursor-pointer disabled:cursor-not-allowed`;

const variantClassNames: ClassNameDictionary<ButtonVariant> = {
  primary: tw`relative z-10 inline-flex overflow-hidden rounded-xl border-2 border-white bg-mauve-800 px-4 py-2 text-lg font-bold text-white shadow-md shadow-zinc-200/10 text-shadow-sm/20 text-shadow-stone-800 *:relative *:z-10 not-disabled:before:absolute not-disabled:before:inset-0 not-disabled:before:z-0 not-disabled:before:origin-bottom not-disabled:before:scale-y-0 not-disabled:before:bg-conic/decreasing not-disabled:before:from-violet-700 not-disabled:before:via-lime-300 not-disabled:before:to-violet-700 not-disabled:before:transition-transform not-disabled:before:duration-200 not-disabled:before:ease-out not-disabled:before:content-[''] hover:before:scale-y-100 not-disabled:active:scale-95 disabled:bg-zinc-500`,
  headless: tw``,
};

const Button = ({ children, className, variant = 'primary', ...props }: ButtonProps) => {
  const style = clsx(baseClassName, variantClassNames[variant], className);

  return (
    <button className={style} {...props}>
      <span>{children}</span>
    </button>
  );
};

export default Button;
