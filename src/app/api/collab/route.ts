import { Prisma } from '@prisma/client';
import { createRecommendation, type Body } from '@lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import getUser from '@lib/get-user';
import { getServerSession } from 'next-auth';
import { authOptions } from '@auth';

export async function POST(request: NextRequest) {
  const body: Body = await request.json();
  if (!body.track_name || !body.track_id) {
    return NextResponse.json(
      { message: 'Invalid track name or track id' },
      { status: 401 },
    );
  }

  if (body.content && body.content.length > 140) {
    return NextResponse.json({ message: 'Message too long' }, { status: 401 });
  }

  try {
    const session = await getUser();
    if (!session) throw session;
    await createRecommendation(session?.user, body);
    return NextResponse.json(
      { message: 'Recommendation created' },
      { status: 201 },
    );
  } catch (error) {
    console.error('CreateRecommendationError', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return NextResponse.json(
          { message: 'Recommendation already exists' },
          { status: 401 },
        );
      }
    }

    return NextResponse.json(
      { message: 'Something unexpected occurred' },
      { status: 500 },
    );
  }
}
