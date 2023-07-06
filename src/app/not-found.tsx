import Link from 'next/link';

export default function notFound() {
  return (
    <div className="my-6 md:my-32">
      <h2 className="text-2xl mb-6">This page does not exist</h2>
      <Link className="hover:underline focus:underline" href="/">
        Back to Home
      </Link>
    </div>
  );
}
