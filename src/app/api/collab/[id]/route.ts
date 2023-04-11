import { NextResponse } from "next/server";
import { deleteRecommendation } from "@lib/prisma";

type Params = { params: { id: string } };
export async function DELETE(request: Request, { params }: Params) {
 try {
  await deleteRecommendation(params.id);
  return NextResponse.json({ success: true }, { status: 202 });
 } catch (error) {
  console.error(error);
  return NextResponse.json({ success: false }, { status: 500 });
 }
}
