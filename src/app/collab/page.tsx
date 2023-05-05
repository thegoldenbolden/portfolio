import { LoginButton, LogoutButton } from '@components/buttons/auth';
import { SPOTIFY_TRACK, SPOTIFY_USER } from '@lib/spotify';
import { getRecommendations } from '@lib/prisma';
import StyledLink from '@components/link/styled';
import type { Session } from 'next-auth';
import nextDynamic from 'next/dynamic';
import type { Metadata } from 'next';
import RemoveButton from './remove';
import getUser from '@lib/get-user';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Collab',
  description: 'Help me discover more music',
};

export const dynamic = 'force-dynamic';
const DynamicForm = nextDynamic(() => import('./form'));

export default async function Page() {
  return (
    <>
      <h1 className="flex text-2xl flex-wrap justify-between items-center gap-2 capitalize mb-6">
        Help me discover more music
        <Suspense>
          {/** @ts-expect-error Server Component */}
          <Auth />
        </Suspense>
      </h1>
      <Suspense>
        {/** @ts-expect-error Server Component */}
        <Recommendations />
      </Suspense>
    </>
  );
}

async function Recommendations() {
  const session = await getUser();

  return (
    <div
      className={`grid grid-cols-auto gap-6 ${
        session?.user ? 'sm:grid-cols-2' : ''
      }`}
    >
      <Suspense fallback={<span>Loading recommendations..</span>}>
        {/** @ts-expect-error Server Component */}
        <Form />
        {/** @ts-expect-error Server Component */}
        <RecommendationList user={session?.user} />
      </Suspense>
    </div>
  );
}

async function Auth() {
  const session = await getUser();
  return session?.user ? <LogoutButton /> : <LoginButton />;
}

async function Form() {
  const session = await getUser();
  return session?.access_token ? <DynamicForm /> : null;
}

async function RecommendationList({ user }: { user?: Session['user'] }) {
  const recommendations = await getRecommendations();
  if (!recommendations) {
    return (
      <p className="text-base">There was an error getting recommendations.</p>
    );
  }

  if (recommendations.length === 0) {
    return <p className="text-base">No recommendations have been made yet.</p>;
  }

  return (
    <ul className="flex flex-col gap-2 text-sm overflow-hidden">
      {recommendations.map((rec) => {
        return (
          <li key={rec.id} className="text-sm flex gap-px">
            {rec.user.username === user?.name && <RemoveButton id={rec.id} />}
            <div className="flex flex-col gap-px">
              <StyledLink
                className="text-tw-secondary hover:underline focus:underline"
                href={`${SPOTIFY_TRACK}/${rec.track.id}`}
              >
                {rec.track.name}
              </StyledLink>
              <div>
                {rec.anonymous ? (
                  <span className="text-tw-gray">Anonymous: </span>
                ) : (
                  <StyledLink
                    className="text-tw-gray hover:underline focus:underline"
                    href={`${SPOTIFY_USER}/${rec.username}`}
                  >
                    {rec.username}
                  </StyledLink>
                )}
                {rec.content && (
                  <p className="inline break-words">: {rec.content}</p>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
