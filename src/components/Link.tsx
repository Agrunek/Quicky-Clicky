import type { AnchorHTMLAttributes, Ref } from 'react';
import type { LinkComponent, LinkComponentProps } from '@tanstack/react-router';

import { createLink } from '@tanstack/react-router';
import clsx from 'clsx';

import { tw } from '@/utils/string';

interface BasicLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  ref?: Ref<HTMLAnchorElement>;
}

const baseClassName = tw`min-w-60 rounded-xl bg-violet-600 px-6 py-2 text-center font-semibold text-white shadow-md transition duration-200 ease-in-out hover:bg-violet-700 focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:outline-none`;

const BasicLinkComponent = ({ className, ...props }: BasicLinkProps) => {
  const style = clsx(baseClassName, className);

  return <a className={style} {...props} />;
};

export type LinkProps = LinkComponentProps<typeof BasicLinkComponent>;

const CreatedLinkComponent = createLink(BasicLinkComponent);

const Link: LinkComponent<typeof BasicLinkComponent> = (props) => {
  return <CreatedLinkComponent preload="intent" {...props} />;
};

export default Link;
