'use client';
import { useSelectedLayoutSegment } from 'next/navigation';
import { RightArrowIcon } from './icons';
import Link from 'next/link';

export default function ActiveLink({
  href,
  children,
  className,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  const segment = useSelectedLayoutSegment() || '';
  const isActive = `/${segment}` === href;

  return (
    <Link
      className={`flex items-center gap-2 text-card-foreground ${className} ${
        isActive
          ? 'text-foreground'
          : 'transition-colors hover:text-foreground focus-visible:text-foreground'
      }`}
      aria-label={`go to ${href}`}
      href={href}
    >
      {children}
    </Link>
  );
}
