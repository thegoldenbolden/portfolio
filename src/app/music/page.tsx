import PreviewTrack, { AudioProvider } from '@/components/preview-track';
import { kv } from '@vercel/kv';
import type { Metadata } from 'next';
import Image from 'next/image';

type User = {
  state: string;
  scope: string;
  access_token: string;
  refresh_token?: string;
  expires_in: number;
};

type RefreshTokenResponse = {
  access_token: string;
  token_type: string;
  scope: string;
  expires: number;
};

type ExternalUrl = {
  external_urls: {
    spotify: string;
  };
};

type Track = {
  repeats: number;
  played_at: string;
  track: ExternalUrl & {
    album: { name: string; images: { url: string }[] };
    artists: ({ name: string; id: string } & ExternalUrl)[];
    explicit: boolean;
    name: string;
    id: string;
    preview_url: string;
  };
};

const TOKEN_URL = 'https://accounts.spotify.com/api/token';
const RECENT_TRACK =
  'https://api.spotify.com/v1/me/player/recently-played?limit=48';

const getRecentlyListened = async (): Promise<Track[] | null> => {
  try {
    const user = await kv.hgetall<User>(process.env.SPOTIFY_USER);
    let accessToken = user?.access_token;

    if (user?.expires_in && user.expires_in < Date.now()) {
      const token = await requestRefreshToken();
      if (!token?.access_token) throw new Error('failed to refresh token');
      accessToken = token.access_token;
    }

    const res = await fetch(RECENT_TRACK, {
      headers: { Authorization: `Bearer ${accessToken}` },
      next: { revalidate: 3600, tags: ['recently_played'] },
    });

    if (!res.ok || res.status !== 200) throw res;
    const tracks = await res.json();

    const items = new Map<string, Track & { repeats: number }>();

    (tracks.items ?? []).forEach((item: Track) => {
      const track = items.get(item.track.id);
      if (items.has(item.track.id)) {
        track.repeats += 1;
        return;
      }
      items.set(item.track.id, { repeats: 1, ...item });
    });

    return Array.from(items.values());
  } catch (error) {
    console.error(error);
    return [];
  }
};

const requestRefreshToken = async (): Promise<RefreshTokenResponse> => {
  try {
    const refresh_token = await kv.hget<string>(
      process.env.SPOTIFY_USER,
      'refresh_token',
    );
    if (!refresh_token) throw new Error('Missing refresh token');

    const res = await fetch(TOKEN_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' +
          Buffer.from(
            process.env.SPOTIFY_CLIENT_ID +
              ':' +
              process.env.SPOTIFY_CLIENT_SECRET,
          ).toString('base64'),
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refresh_token,
      }),
    });

    if (!res.ok || res.status !== 200) throw res;
    const data = await res.json();

    await kv.hset(process.env.SPOTIFY_USER, {
      access_token: data.access_token,
      refresh_token,
      token_type: data.token_type,
      expires_in: data.expires_in * 1000 + Date.now(),
      scope: data.scope,
    });

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const requestAccessToken = async (code: string, state: string) => {
  try {
    const res = await fetch(TOKEN_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' +
          Buffer.from(
            process.env.SPOTIFY_CLIENT_ID +
              ':' +
              process.env.SPOTIFY_CLIENT_SECRET,
          ).toString('base64'),
      },
      body: new URLSearchParams({
        code: code,
        redirect_uri: 'http://localhost:3000/api/callback',
        grant_type: 'authorization_code',
      }),
    });

    if (!res.ok) throw res;
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

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
