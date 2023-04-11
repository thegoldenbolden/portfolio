import { NextResponse } from "next/server";
import { searchTracks } from "@lib/spotify";
import getUser from "@lib/get-user";

export async function GET(request: Request) {
 const url = new URL(request.url);
 const q = url.searchParams.get("q");
 if (!q) return NextResponse.json("Bad Request", { status: 400 });

 try {
  const session = await getUser();
  if (!session) {
   return NextResponse.json("You must be signed in to search for songs.", {
    status: 401,
   });
  }

  const data = await searchTracks(q, session.accessToken);
  return NextResponse.json(
   { tracks: !data.tracks?.items?.length ? [] : data.tracks.items },
   { status: 200 }
  );
 } catch (error) {
  console.error(error);
  return NextResponse.json(error?.message ?? "An error occurred.", {
   status: error.status ?? 500,
  });
 }
}
