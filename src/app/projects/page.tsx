import type { Metadata } from 'next';
import { Cards, Projects } from 'app/page';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Projects',
  description: "A list of projects I've worked on",
};

export const revalidate = 86400;
export default async function Page() {
  return (
    <div className="my-32">
      <h1 className="font-bold text-2xl">Projects</h1>
      <ul className="flex flex-col mt-2 gap-3 pb-6 grid grid-cols-gallery">
        <Suspense fallback={<Cards count={6} />}>
          <Projects />
        </Suspense>
      </ul>
    </div>
  );
}
