import type { NextApiRequest, NextApiResponse } from "next";
import { SEARCH_API } from "@lib/spotify";
import { authOptions } from "@auth";
import { getServerSession } from "next-auth";

export default async function handler(
 req: NextApiRequest,
 res: NextApiResponse
) {
 if (req.method !== "GET") {
  res.status(405).end();
  return;
 }

 const song = req.query.q;
 if (!song) {
  res.status(400).end();
  return;
 }

 try {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
   res.status(401).end();
   return;
  }
  if (!session.access_token) {
   res.status(401).end();
   return;
  }

  const url = new URL(SEARCH_API);
  url.searchParams.set("q", `${song}`);

  const response = await fetch(url, {
   method: "GET",
   headers: { Authorization: `Bearer ${session.access_token}` },
  });

  if (!response.ok) throw response;
  if (response.status > 200 || response.status < 299) {
   const data = await response.json();
   res
    .status(response.status)
    .json({ tracks: !data.tracks?.items?.length ? [] : data.tracks.items });
   return;
  }
 } catch (error) {
  console.error(error);
  if (error.status === 401) {
   res.status(401).json({ message: "Try signing in again?" });
   return;
  }
  res
   .status(error.status ?? 500)
   .json({ message: error.message ?? "An error occurred." });
  return;
 }
}
