import { kv } from '@vercel/kv';

export type Tag =
  | 'Next.js'
  | 'Node.js'
  | 'React'
  | 'Typescript'
  | 'Side Project'
  | 'HTML5'
  | 'CSS3';

export type Project = {
  name: string;
  site?: string;
  tags: Tag[];
  description: string;
  home?: boolean;
  year: string;
  status: 'now' | 'past' | 'future';
};

export const projects: Project[] = [
  {
    home: true,
    name: 'Wouldry',
    site: 'https://www.wouldry.com',
    tags: ['Next.js', 'React', 'Typescript', 'Side Project'],
    description: 'Discover your true values with gut-wrenching dilemmas',
    year: '2023',
    status: 'now',
  },
  {
    home: true,
    name: 'Pokefolder',
    site: 'https://www.pokefolder.com',
    tags: ['Next.js', 'React', 'Typescript', 'Side Project'],
    description:
      'Explore an extensive pokemon card database and find prices about any card',
    year: '2022',
    status: 'now',
  },
  {
    home: true,
    name: 'Portfolio',
    site: 'https://www.jacobbolden.com',
    tags: ['Next.js', 'React', 'Typescript', 'Side Project'],
    description: "This site that you're currently viewing",
    year: '2022',
    status: 'now',
  },
  {
    name: 'Noodle',
    tags: ['Node.js', 'Typescript', 'Side Project'],
    description: 'A discord bot',
    year: '2020',
    status: 'past',
  },
  {
    name: 'Trivia Buddy',
    site: 'https://thegoldenbolden.github.io/trivia/',
    tags: ['HTML5', 'CSS3', 'Side Project'],
    description: 'A trivia app',
    year: '2021',
    status: 'past',
  },
];

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
  expires_in: number;
};

type ExternalUrl = {
  external_urls: {
    spotify: string;
  };
};

export type Track = {
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

const requestRefreshToken = async (): Promise<RefreshTokenResponse | null> => {
  try {
    const refresh_token = await kv.hget<string>(
      process.env.SPOTIFY_USER,
      'refresh_token',
    );

    if (!refresh_token) {
      throw new Error('Missing refresh token');
    }

    const res = await fetch(TOKEN_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
        ).toString('base64')}`,
      },
      body: new URLSearchParams({
        refresh_token,
        grant_type: 'refresh_token',
      }),
    });

    if (!res.ok || res.status !== 200) {
      throw new Error('Error requesting token');
    }

    const data = (await res.json()) as RefreshTokenResponse;

    await kv.hset(process.env.SPOTIFY_USER, {
      access_token: data.access_token,
      refresh_token,
      token_type: data.token_type,
      expires_in: data.expires_in * 1000 + Date.now(),
      scope: data.scope,
    });

    return data;
  } catch (error) {
    return null;
  }
};

// const requestAccessToken = async (code: string, state: string) => {
//   try {
//     const res = await fetch(TOKEN_URL, {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/x-www-form-urlencoded',
//         Authorization:
//           'Basic ' +
//           Buffer.from(
//             process.env.SPOTIFY_CLIENT_ID +
//               ':' +
//               process.env.SPOTIFY_CLIENT_SECRET,
//           ).toString('base64'),
//       },
//       body: new URLSearchParams({
//         code: code,
//         redirect_uri: 'http://localhost:3000/api/callback',
//         grant_type: 'authorization_code',
//       }),
//     });

//     if (!res.ok) throw res;
//     const data = await res.json();
//     return data;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };

export const getRecentlyListened = async (): Promise<Track[] | null> => {
  try {
    const user = await kv.hgetall<User>(process.env.SPOTIFY_USER);
    let accessToken = user?.access_token;

    if (user?.expires_in && user.expires_in < Date.now()) {
      const token = await requestRefreshToken();
      if (!token?.access_token) {
        throw new Error('failed to refresh token');
      }

      accessToken = token.access_token;
    }

    const res = await fetch(RECENT_TRACK, {
      headers: { Authorization: `Bearer ${accessToken}` },
      next: { revalidate: 3600, tags: ['recently_played'] },
    });

    if (!res.ok || res.status !== 200) {
      throw new Error('Failed to fetch recent tracks');
    }

    const tracks = (await res.json()) as { items?: Track[] };
    const items = new Map<string, Track & { repeats: number }>();

    (tracks.items ?? []).forEach((item) => {
      const track = items.get(item.track.id);
      if (track && items.has(item.track.id)) {
        track.repeats += 1;
        return;
      }

      items.set(item.track.id, { ...item, repeats: 1 });
    });
    return Array.from(items.values());
  } catch (error) {
    return [];
  }
};
