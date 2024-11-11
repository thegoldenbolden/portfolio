'use client';

export default function GlobalError({
  _error,
  reset,
}: {
  _error: Error;
  reset: () => void;
}): React.ReactNode {
  return (
    <html lang="en">
      <body className="min-svh grid place-items-center bg-background text-foreground">
        <div className="flex flex-col gap-4">
          <h2>Something went wrong!</h2>
          <button
            type="button"
            onClick={() => {
              reset();
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
