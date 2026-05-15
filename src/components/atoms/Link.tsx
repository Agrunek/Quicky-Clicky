import type { LinkComponent } from '@tanstack/react-router';

import type { ClassNameDictionary } from '@/utils/string';

import { forwardRef } from 'react';
import { createLink } from '@tanstack/react-router';
import clsx from 'clsx';

import { tw } from '@/utils/string';

type LinkVariant = 'primary' | 'headless';

interface BasicLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  ref?: React.Ref<HTMLAnchorElement>;
  variant?: LinkVariant;
}

const baseClassName = tw`cursor-pointer`;

const variantClassNames: ClassNameDictionary<LinkVariant> = {
  primary: tw`relative z-10 inline-flex justify-center overflow-hidden rounded-xl border-2 border-white bg-mauve-800 px-4 py-2 text-lg font-bold text-white shadow-md shadow-zinc-200/10 text-shadow-sm/20 text-shadow-stone-800 *:relative *:z-10 before:absolute before:inset-0 before:z-0 before:origin-bottom before:scale-y-0 before:bg-conic/decreasing before:from-violet-700 before:via-lime-300 before:to-violet-700 before:transition-transform before:duration-200 before:ease-out before:content-[''] hover:before:scale-y-100 active:scale-95`,
  headless: tw``,
};

const BasicLinkComponent = forwardRef<HTMLAnchorElement, BasicLinkProps>(
  ({ children, className, variant = 'primary', ...props }, ref) => {
    const style = clsx(baseClassName, variantClassNames[variant], className);

    return (
      <a ref={ref} className={style} {...props}>
        <span>{children}</span>
      </a>
    );
  },
);

const CreatedLinkComponent = createLink(BasicLinkComponent);

const Link: LinkComponent<typeof BasicLinkComponent> = (props) => {
  return <CreatedLinkComponent preload="intent" {...props} />;
};

export default Link;
