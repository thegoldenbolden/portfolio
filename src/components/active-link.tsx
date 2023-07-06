'use client';
import { useSelectedLayoutSegment } from 'next/navigation';
import { RightArrowIcon } from './icons';
import Link from 'next/link';

export default function ActiveLink({
  route,
  children,
  className,
}: {
  route: string;
  className: string;
  children: React.ReactNode;
}) {
  const segment = useSelectedLayoutSegment() || '';
  const isActive = `/${segment}` === route;

  return (
    <Link
      className={`lowercase flex text-card-foreground items-center gap-2 ${className} ${
        isActive
          ? 'text-foreground'
          : 'transition-colors hover:text-foreground focus-visible:text-foreground'
      }`}
      aria-label={`go to ${route}`}
      href={route}
    >
      {isActive ? (
        <RightArrowIcon className="w-4 h-4 text-foreground motion-safe:animate-bounce-right" />
      ) : null}
      {children}
    </Link>
  );
}
