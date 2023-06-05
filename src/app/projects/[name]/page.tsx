import FormatDate from '@components/format-date';
import StyledLink from '@components/link/styled';
import { getReadme, getRepo } from '@lib/github';
import CustomMDX from '@components/mdx/custom';
import { notFound } from 'next/navigation';
import Divider from '@components/divider';
import uppercase from '@lib/uppercase';

type Params = { params: { name: string } };
export async function generateMetadata({ params }: Params) {
  const repo = await getRepo(params.name);
  if (!repo?.name) return { title: 'Project Not Found' };
  const name = uppercase(repo.name).join(' ');
  return {
    title: name,
    description: repo.description ?? 'No description available.',
    keywords: repo.topics ?? [],
  };
}

export const revalidate = 86400;
export default async function Page({ params }: Params) {
  const repo = await getRepo(params.name);

  if (!repo?.name) {
    notFound();
  }

  const readme = await getReadme(repo.name);

  return (
    <div className="mt-6 space-y-6">
      <section className="space-y-4">
        {readme && <CustomMDX source={readme} />}
        <div className="flex flex-wrap items-center gap-2 lowercase">
          <StyledLink href={repo.html_url}>source</StyledLink>
          {repo.homepage && (
            <>
              <span>•</span>
              <StyledLink href={repo.homepage}>website</StyledLink>
            </>
          )}
        </div>
      </section>
      <Divider />
      <section className="space-y-6">
        {repo.topics.length === 0 ? null : (
          <div className="flex flex-wrap gap-2 text-sm text-tw-gray">
            {repo.topics.map((topic) => (
              <span key={topic}>{`#${topic}`}</span>
            ))}
          </div>
        )}
        <div className="text-sm text-tw-gray">
          Created at <FormatDate date={repo.created_at} />
        </div>
      </section>
      <p>{repo.description ?? 'No description available.'}</p>
      <Divider />
      {readme && <CustomMDX source={readme} />}
      <div className="flex flex-wrap items-center gap-2 lowercase">
        {repo.visibility === 'public' && (
          <StyledLink href={repo.html_url}>source</StyledLink>
        )}
        {repo.homepage && (
          <>
            <span>•</span>
            <StyledLink href={repo.homepage}>website</StyledLink>
          </>
        )}
      </div>
      {repo.topics.length === 0 ? null : (
        <div className="flex flex-wrap gap-2 text-sm text-gray">
          {repo.topics.map((topic) => (
            <span key={topic}>{`#${topic}`}</span>
          ))}
        </div>
      )}
      <Divider />
      <div className="text-sm text-tw-gray">
        Created at <FormatDate date={repo.created_at} />
      </div>
    </div>
  );
}
