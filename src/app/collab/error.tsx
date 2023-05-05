'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="space-y-2">
      <h2>Something went wrong</h2>
      <button
        aria-label="try again?"
        className="hover:underline focus-visible:underline"
        onClick={() => reset()}
      >
        Try again?
      </button>
    </div>
  );
}
