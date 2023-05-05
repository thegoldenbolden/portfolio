import { type NextRequest, NextResponse } from 'next/server';
import { SEARCH_API } from '@lib/spotify';
import getUser from '@lib/get-user';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const song = url.searchParams.get('q');
  if (!song) {
    return NextResponse.json({ message: 'Invalid track' }, { status: 400 });
  }

  try {
    const session = await getUser();
    if (!session?.access_token) {
      return NextResponse.json(
        { message: 'Invalid access token' },
        { status: 401 },
      );
    }

    const SPOTIFY_API = new URL(SEARCH_API);
    SPOTIFY_API.searchParams.set('q', song);

    const response = await fetch(SPOTIFY_API, {
      method: 'GET',
      headers: { Authorization: `Bearer ${session.access_token}` },
    });

    if (!response.ok) throw response;
    if (response.status > 200 || response.status < 299) {
      const data = await response.json();

      return NextResponse.json(
        { tracks: !data.tracks?.items?.length ? [] : data.tracks.items },
        { status: response.status },
      );
    }
  } catch (error) {
    console.error('TrackSearchError', error);
    if (error.status === 401) {
      return NextResponse.json(
        { message: 'Try signing in again?' },
        { status: error.status },
      );
    }

    return NextResponse.json(
      { message: 'An error occurred' },
      { status: error.status || 500 },
    );
  }
}
