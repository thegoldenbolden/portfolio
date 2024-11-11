import Link from 'next/link';

export default function notFound(): React.ReactNode {
  return (
    <main>
      <div className="my-6 lg:my-32">
        <h2 className="mb-6 text-2xl">This page does not exist</h2>
        <Link className="hover:underline focus:underline" href="/">
          Back to Home
        </Link>
      </div>
    </main>
  );
}
