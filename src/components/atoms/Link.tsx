import type { LinkComponent } from '@tanstack/react-router';

import type { ClassNameDictionary } from '@/utils/string';

import { forwardRef } from 'react';
import { createLink } from '@tanstack/react-router';
import clsx from 'clsx';

import { tw } from '@/utils/string';

interface BasicLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  ref?: React.Ref<HTMLAnchorElement>;
  variant?: LinkVariant;
}

type LinkVariant = 'headless' | 'primary';

const baseClassName = tw`cursor-pointer`;

const variantClassNames: ClassNameDictionary<LinkVariant> = {
  headless: tw``,
  primary: tw`inline-flex min-h-12 items-center justify-center rounded-2xl border border-app-accent-border bg-app-accent px-5 py-3 text-center text-base font-bold tracking-wide text-white shadow-app-action transition duration-200 hover:-translate-y-0.5 hover:bg-app-accent-hover hover:shadow-app-action-hover active:translate-y-0.5 active:shadow-app-action-active`,
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
