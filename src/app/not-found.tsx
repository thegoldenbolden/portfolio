import Link from 'next/link';

export default function notFound() {
  return (
    <>
      <h2 className="text-2xl mb-6">Page Not Found</h2>
      <Link className="hover:underline focus:underline" href="/">
        Back to Home
      </Link>
    </>
  );
}
