import clsx from 'clsx';
import Link, { LinkProps } from 'next/link';
import React from 'react';

const CardRoot = ({
  as: Component = 'div',
  className,
  children,
}: React.PropsWithChildren<{ as?: React.ElementType; className?: string }>) => {
  return (
    <Component className={clsx(className, 'group relative flex flex-col items-start')}>
      {children}
    </Component>
  );
};

const CardLink = ({ children, ...props }: React.PropsWithChildren<LinkProps>) => {
  return (
    <>
      <span className="absolute -inset-y-6 -inset-x-4 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl" />
      <Link {...props}>
        <span className="absolute -inset-y-6 -inset-x-4 z-20 sm:-inset-x-6 sm:rounded-2xl" />
        <span className="relative z-10">{children}</span>
      </Link>
    </>
  );
};

const CardTitle = ({
  as: Component = 'h2',
  href,
  children,
}: React.PropsWithChildren<{ as?: React.ElementType; href?: string }>) => {
  return (
    <Component className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100 text-balance">
      {href ? <Card.Link href={href}>{children}</Card.Link> : children}
    </Component>
  );
};

const CardDescription = ({ children }: React.PropsWithChildren) => {
  return <p className="relative z-10 mt-2 text-sm">{children}</p>;
};

export const Card = Object.assign(CardRoot, {
  Link: CardLink,
  Title: CardTitle,
  Description: CardDescription,
});