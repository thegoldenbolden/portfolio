import PreviewTrack, { AudioProvider } from '@/components/preview-track';
import { Track, getRecentlyListened } from '@/utils';
import type { Metadata } from 'next';
import Image from 'next/image';


export const metadata: Metadata = {
  title: 'Recently listened',
  description: "Music I've listened to recently",
};

export const revalidate = 3600;

export default async function Page() {
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
      <RecentlyPlayed />
    </section>
  );
}

async function RecentlyPlayed() {
  const items = await getRecentlyListened();
  if (!items.length) return <span>Failed to get track</span>;

  return (
    <ul className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-3 sm:px-0">
      <AudioProvider>
        {items.map(({ track, played_at }, i) => {
          return (
            <Project
              {...track}
              unoptimized={i > 11}
              key={`${track.id}-${played_at}`}
            />
          );
        })}
      </AudioProvider>
    </ul>
  );
}

function Project(track: Track['track'] & { unoptimized: boolean }) {
  return (
    <li className="flex items-center gap-2 rounded-md sm:block sm:space-y-4 sm:bg-card sm:p-[1em]">
      {track.album.images[0].url && (
        <div className="group relative aspect-square h-12 w-12 sm:h-auto sm:w-full">
          <Image
            unoptimized={track.unoptimized}
            height={256}
            width={256}
            src={track.album.images[0].url}
            className="h-full w-full rounded-md shadow-lg shadow-background transition-opacity group-hover:opacity-50"
            alt={`album cover for ${track.album.name}`}
          />
          {track.preview_url && <PreviewTrack url={track.preview_url} />}
        </div>
      )}
      <div className="space-y-2">
        <a
          target="_blank"
          title={track.name}
          rel="noreferrer noopener"
          href={track.external_urls.spotify}
          className="line-clamp-1 text-base font-bold hover:underline focus-visible:underline sm:line-clamp-2"
        >
          {track.name}
        </a>
        <div className="line-clamp-1 sm:line-clamp-2">
          {track.artists.map((a, i) => (
            <>
              <a
                key={a.name}
                target="_blank"
                title={a.name}
                rel="noreferrer noopener"
                href={a.external_urls.spotify}
                className="hover:underline focus-visible:underline"
              >
                {a.name}
              </a>
              {i !== track.artists.length - 1 && ', '}
            </>
          ))}
        </div>
      </div>
    </li>
  );
}
