export const SPOTIFY_API = "https://api.spotify.com/v1";
export const SEARCH_API = `${SPOTIFY_API}/search?limit=5&type=track`;
export const SPOTIFY_USER = "https://open.spotify.com/user";
export const SPOTIFY_TRACK = "https://open.spotify.com/track";

type ExternalURL = { spotify: string };
type Artist = { id: string; name: string; external_urls: ExternalURL };

type Image = {
 url: string;
 height: number;
 width: number;
};

export type Track = {
 id: string;
 name: string;
 album: Album;
 artists: Artist[];
 external_urls: ExternalURL;
};

type Album = {
 name: string;
 images: Image[];
 external_urls: ExternalURL;
};

type Response = { tracks: { items: Track[] } };
export async function searchTracks(
 title: string,
 token?: string
): Promise<Response> {
 if (!token) throw new Error("No token provided");
 const url = new URL(SEARCH_API);
 url.searchParams.set("q", title);

 const response = await fetch(url, {
  method: "GET",
  headers: { Authorization: `Bearer ${token}` },
 });

 if (!response.ok) {
  if (response.status === 401) {
   throw new Error("Try logging in again?");
  }

  throw new Error("Failed to fetch");
 }

 console.log({
  date: response.headers.get("date"),
  q: title,
  token,
  url: response.url,
  a: url.href,
 });

 return response.json();
}
