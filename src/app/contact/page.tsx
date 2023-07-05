import type { Metadata, Route } from 'next';
import Link from 'next/link';
import Form from './form';
import { CalendarIcon } from '@components/icons';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Send me a message',
};

export default function Page() {
  return (
    <div className="my-32">
      <h1 className="font-bold text-2xl">🤙 talk to me</h1>
      <div className="flex flex-col gap-3 max-w-screen-xs">
        <div className="flex items-center gap-2">
          <Link
            href="/meet"
            className="flex grow justify-center text-white bg-[#006bff] py-1.5 rounded-md items-center gap-2 hover:bg-[#0076ff] focus-visible:bg-[#0076ff] transition-colors"
          >
            <CalendarIcon className="w-6 h-6" />
            <span>schedule a meeting</span>
          </Link>
        </div>
        <div className="flex justify-center items-center relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-px before:w-full before:bg-border">
          <span className="px-3 bg-background rounded-full flex items-center justify-center py-1 text-sm text-card-foreground z-10">
            or
          </span>
        </div>
        <Form />
      </div>
    </div>
  );
}
