'use client';
import { useSelectedLayoutSegment } from 'next/navigation';
import Link from 'next/link';
import { Route } from 'next';

export default function ActiveLink({
  route,
  children,
}: {
  route: Route;
  children: React.ReactNode;
}) {
  const segment = useSelectedLayoutSegment() || '';
  const className =
    segment === route
      ? 'text-tw-secondary'
      : 'text-tw-black dark:text-tw-white transition-colors hover:text-tw-secondary focus-visible:text-tw-secondary';

  return (
    <Link
      className={`lowercase ${className}`}
      aria-label={`go to ${route}`}
      href={route}
    >
      {children}
    </Link>
  );
}
