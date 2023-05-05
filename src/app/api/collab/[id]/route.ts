import { deleteRecommendation } from '@lib/prisma';
import { getServerSession } from 'next-auth';
import { NextRequest } from 'next/server';

type Params = { params: { id: string } };
export async function DELETE(request: NextRequest, { params }: Params) {
  const session = await getServerSession();

  if (!session?.user.name) {
    return new Response('Unauthorized', { status: 401 });
  }

  if (!params.id) {
    return new Response('Invalid id', { status: 401 });
  }

  try {
    await deleteRecommendation(session.user.name, params.id);
    return new Response(null, { status: 202 });
  } catch (error) {
    console.error('DeleteRecommendationError', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
