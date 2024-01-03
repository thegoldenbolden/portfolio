import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Recently listened',
  description: "Music I've listened to recently",
};

export const revalidate = 3600;

export default function Page(): React.ReactNode {
  return (
    <section className="z-30 flex w-full flex-col gap-2 rounded-md px-2 sm:px-0">
      <div className="flex items-center gap-2 py-0.5">
        <Image
          src="/images/spotify.png"
          alt="spotify brand logo"
          height={24}
          width={24}
          className="h-6 w-6"
        />
        <h4>Recently Listened</h4>
      </div>
    </section>
  );
}
