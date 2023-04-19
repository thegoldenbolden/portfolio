import { authOptions } from "@auth";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { Prisma } from "@prisma/client";
import { createRecommendation } from "@lib/prisma";

export default async function handler(
 req: NextApiRequest,
 res: NextApiResponse
) {
 if (req.method !== "POST") {
  res.status(405).end();
  return;
 }

 const body = req.body;
 if (!body.track_name || !body.track_id) {
  res.status(400).json({ message: "Missing track" });
  return;
 }

 if (body.content.length > 140) {
  res.status(400).json({ message: "Message too long" });
  return;
 }

 try {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user) {
   res.status(401).end();
   return;
  }
  await createRecommendation(session?.user, body);
  return res.status(201).json({ message: "OK" });
 } catch (error) {
  console.error("Recommendation encountered an error", error);
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
   if (error.code === "P2002") {
    return res
     .status(401)
     .json({ message: "This recommendation was previously made" });
   }
  }

  res
   .status(error.status || 500)
   .json({ message: "There was an error submitting the recommendation" });
 }
}
