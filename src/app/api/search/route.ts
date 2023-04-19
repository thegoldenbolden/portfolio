import { NextResponse } from "next/server";
import { SEARCH_API } from "@lib/spotify";
import getUser from "@lib/get-user";

export async function GET(request: Request) {
 const url = new URL(request.url);
 const song = url.searchParams.get("q");
 if (!song) return NextResponse.json("Bad Request", { status: 400 });

 try {
  const session = await getUser();
  if (!session) {
   return NextResponse.json(
    { message: "You must be signed in to search for songs." },
    { status: 401 }
   );
  }

  if (!session.access_token) {
   return NextResponse.json(
    { message: "No session token available" },
    { status: 401 }
   );
  }

  const url = new URL(SEARCH_API);
  url.searchParams.set("q", song);

  const response = await fetch(url, {
   method: "GET",
   headers: { Authorization: `Bearer ${session.access_token}` },
  });

  if (!response.ok) throw response;

  if (response.status > 200 || response.status < 299) {
   const data = await response.json();
   return NextResponse.json(
    { tracks: !data.tracks?.items?.length ? [] : data.tracks.items },
    { status: 200 }
   );
  }
 } catch (error) {
  console.error(error.name, error);

  if (error.status === 401) {
   return NextResponse.json(
    { message: "Try signing in again?" },
    { status: 401 }
   );
  }

  return NextResponse.json(
   { message: error.message ?? "An error occurred." },
   { status: error.status ?? 500 }
  );
 }
}
