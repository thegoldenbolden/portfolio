import type { Session } from "next-auth";
import { PrismaClient, type Recommendation } from "@prisma/client";
import getUser from "./get-user";

declare global {
 var prisma: PrismaClient | undefined;
}

const prisma = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
 globalThis.prisma = prisma;
}

type Body = {
 track_id: string;
 track_name: string;
 anonymous: boolean;
 content?: string;
};

// Username used as id since Spotify username cannot be changed.
export async function createRecommendation(user: Session["user"], body: Body) {
 if (!user.name) throw Error("No username");
 return prisma.recommendation.create({
  data: {
   user: {
    connectOrCreate: {
     where: { username: user.name },
     create: {
      avatar: user.image,
      username: user.name,
     },
    },
   },
   track: {
    connectOrCreate: {
     where: { id: body.track_id },
     create: {
      id: body.track_id,
      name: body.track_name,
     },
    },
   },
   content: body.content,
   anonymous: body.anonymous,
  },
 });
}

export async function getRecommendations() {
 return prisma.recommendation.findMany({
  take: 100,
  orderBy: { createdAt: "desc" },
  include: { user: true, track: true },
 });
}

export async function deleteRecommendation(username: string, id: string) {
 return prisma.recommendation.delete({
  where: { username_id: { id, username } },
 });
}
