import { kv } from '@vercel/kv';

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

const TOKEN_URL = 'https://accounts.spotify.com/api/token';
const RECENT_TRACK =
  'https://api.spotify.com/v1/me/player/recently-played?limit=5';

type Track = {
  track: ExternalUrl & {
    album: { name: string; images: { url: string }[] };
    artists: ({ name: string } & ExternalUrl)[];
    name: string;
    id: string;
  };
};

export const getRecentlyListened = async (): Promise<Track[] | null> => {
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
    return tracks.items ?? [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const requestRefreshToken = async (): Promise<RefreshTokenResponse> => {
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

export const requestAccessToken = async (code: string, state: string) => {
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
