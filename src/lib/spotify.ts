export const SPOTIFY_API = 'https://api.spotify.com/v1';
export const SEARCH_API = `${SPOTIFY_API}/search?limit=5&type=track`;
export const SPOTIFY_USER = 'https://open.spotify.com/user';
export const SPOTIFY_TRACK = 'https://open.spotify.com/track';

export type Track = {
  id: string;
  name: string;
  album: Album;
  artists: Artist[];
  external_urls: ExternalURL;
};

type Response = { tracks: { items: Track[] } };
type ExternalURL = { spotify: string };
type Artist = { id: string; name: string; external_urls: ExternalURL };
type Image = { url: string; height: number; width: number };

type Album = {
  name: string;
  images: Image[];
  external_urls: ExternalURL;
};
