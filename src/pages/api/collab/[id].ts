import { authOptions } from "@auth";
import type { NextApiRequest, NextApiResponse } from "next";
import { deleteRecommendation } from "@lib/prisma";
import { getServerSession } from "next-auth";

export default async function handler(
 req: NextApiRequest,
 res: NextApiResponse
) {
 if (req.method !== "DELETE") {
  res.status(405).end();
  return;
 }
 const session = await getServerSession(req, res, authOptions);
 if (!session?.user.name) {
  res.status(401).end();
  return;
 }

 const id = req.query.id;
 if (!id) {
  res.status(400).end();
  return;
 }

 try {
  await deleteRecommendation(session.user.name, id.toString());
  return res.status(202).end();
 } catch (error) {
  console.error("Error deleting recommendation", error);
  if (error.message === "Unauthorized") {
   res.status(401).end();
   return;
  }

  res.status(error.status || 500).end();
 }
}
