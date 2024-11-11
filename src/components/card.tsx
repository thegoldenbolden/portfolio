import { clsx } from 'clsx';
import Link, { type LinkProps } from 'next/link';
import React from 'react';

function CardRoot({
  as: Component = 'div',
  className,
  children,
}: React.PropsWithChildren<{
  as?: React.ElementType;
  className?: string;
}>): React.ReactNode {
  return (
    <Component
      className={clsx(className, 'group relative flex flex-col items-start')}
    >
      {children}
    </Component>
  );
}

function CardLink({
  children,
  ...props
}: React.PropsWithChildren<LinkProps>): React.ReactNode {
  return (
    <>
      <span className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl dark:bg-zinc-800/50" />
      <Link {...props}>
        <span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
        <span className="relative z-10">{children}</span>
      </Link>
    </>
  );
}

function CardTitle({
  as: Component = 'h2',
  href,
  children,
}: React.PropsWithChildren<{
  as?: React.ElementType;
  href?: string;
}>): React.ReactNode {
  return (
    <Component className="text-balance text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
      {href ? <Card.Link href={href}>{children}</Card.Link> : children}
    </Component>
  );
}

function CardDescription({
  children,
}: React.PropsWithChildren): React.ReactNode {
  return <p className="relative z-10 mt-2 text-sm">{children}</p>;
}

export const Card = Object.assign(CardRoot, {
  Link: CardLink,
  Title: CardTitle,
  Description: CardDescription,
});
