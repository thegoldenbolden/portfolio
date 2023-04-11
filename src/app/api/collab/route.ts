import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { createRecommendation } from "@lib/prisma";

export async function POST(request: Request) {
 const body = await request.json();
 if (!body.track_name || !body.track_id) {
  return NextResponse.json({ error: "Missing track" }, { status: 400 });
 }

 if (body.content.length > 140) {
  return NextResponse.json({ error: "Message too long" }, { status: 400 });
 }

 try {
  await createRecommendation(body);
  return NextResponse.json({ message: "OK" }, { status: 201 });
 } catch (error) {
  console.error(error);
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
   if (error.code === "P2002") {
    return NextResponse.json(
     { error: "This recommendation was previously made" },
     { status: 401 }
    );
   }
  }

  return NextResponse.json(
   { error: "There was an error submitting the recommendation" },
   { status: 500 }
  );
 }
}
