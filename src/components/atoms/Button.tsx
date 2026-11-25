import type { ClassNameDictionary } from '@/utils/string';

import clsx from 'clsx';

import { tw } from '@/utils/string';

interface ButtonProps extends React.AriaAttributes {
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  id?: string;
  name?: string;
  onClick?: () => void;
  role?: React.AriaRole;
  value?: string;
  variant?: ButtonVariant;
}

type ButtonVariant = 'headless' | 'primary';

const baseClassName = tw`cursor-pointer disabled:cursor-not-allowed`;

const variantClassNames: ClassNameDictionary<ButtonVariant> = {
  headless: tw``,
  primary: tw`inline-flex min-h-12 items-center justify-center rounded-2xl border border-app-accent-border bg-app-accent px-5 py-3 text-center text-base font-bold tracking-wide text-white shadow-app-action transition duration-200 hover:-translate-y-0.5 hover:bg-app-accent-hover hover:shadow-app-action-hover active:translate-y-0.5 active:shadow-app-action-active disabled:border-app-disabled-border disabled:bg-app-disabled disabled:text-app-disabled-ink disabled:shadow-none`,
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
