import { deleteRecommendation } from "@lib/prisma";

type Params = { params: { id: string } };
export async function DELETE(_: Request, { params }: Params) {
 try {
  await deleteRecommendation(params.id);
  return new Response(null, { status: 202 });
 } catch (error) {
  console.error("Error deleting recommendation", error);
  if (error.message === "Unauthorized") {
   return new Response(null, { status: 401 });
  }

  return new Response(null, { status: 500 });
 }
}
