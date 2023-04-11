import { PrismaClient } from "@prisma/client";
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

export async function createRecommendation(body: Body) {
 const session = await getUser();
 if (!session?.user?.name) throw new Error("Unauthorized");

 return prisma.recommendation.create({
  data: {
   user: {
    connectOrCreate: {
     where: { username: session.user.name },
     create: {
      avatar: session.user.image,
      username: session.user.name,
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

export async function deleteRecommendation(id: string) {
 const session = await getUser();
 if (!session?.user?.name) throw new Error("Unauthorized");
 return prisma.recommendation.delete({
  where: {
   username_id: {
    id,
    username: session.user.name,
   },
  },
 });
}
