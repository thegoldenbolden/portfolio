import type { Metadata, Route } from 'next';
import Link from 'next/link';
import ContactForm from './form';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Send me a message',
};

export default function Page() {
  return (
    <>
      <div>
        <h1 className="text-2xl">Contact</h1>
        <Link
          href={'/resume.pdf' as Route}
          className="text-tw-secondary text-base hover:underline focus:underline"
        >
          View my resume
        </Link>
      </div>
      <ContactForm />
    </>
  );
}
