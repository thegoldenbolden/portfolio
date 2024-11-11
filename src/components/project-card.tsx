import { Fragment } from 'react';
import type { Project as TProject } from '~/utils';
import { LinkIcon as LinkSVG } from '~/components/icons';
import clsx from 'clsx';

type Props = {
  as?: 'li' | 'div';
  className?: string;
  project: TProject;
};

export function Project({
  project,
  as: Component = 'li',
  className,
}: Props): React.ReactNode {
  const url = project.site ?? project.src;
  return (
    <Component className={clsx("group relative flex grow flex-col gap-2 rounded-xl border border-primary p-6 shadow-2xl shadow-primary/25 transition-all", className)}>
      <Year year={project.year} />
      <Link url={url} name={project.name} />
      <Heading name={project.name} url={url} />
      <Description description={project.description} />
      <Tags tags={project.tags} name={project.name} />
    </Component>
  );
}

function Year({ year }: { year?: string }): React.ReactNode {
  if (!year) return null;

  return (
    <span className="pointer-events-none absolute -top-2.5 left-1/2 z-10 -translate-x-1/2 rounded-full border border-primary bg-background px-2 py-0.5 text-xs group-has-[a:focus-visible]:outline group-has-[a:focus-visible]:outline-2 group-has-[a:focus-visible]:outline-accent">
      {year}
    </span>
  );
}

function Link({
  url,
  name,
}: {
  url?: string;
  name: string;
}): React.ReactNode {
  if (!url) return null;
  return (
    <a
      target="_blank"
      rel="noreferrer noopener"
      href={url}
      aria-labelledby={name}
      className="absolute left-0 top-0 h-full w-full rounded-inherit"
    >
      <span className="sr-only">{url}</span>
    </a>
  );
}

function LinkIcon({ url }: { url?: string }): React.ReactNode {
  if (!url) return null;

  return (
    <span
      className="-z-[1] ml-auto rounded-full border border-primary p-2 transition-all 
  group-hover:scale-105 group-hover:border-primary 
  group-hover:bg-primary group-hover:text-primary-foreground 
  group-hover:shadow-xl group-hover:shadow-primary/25 
  group-has-[a:focus-visible]:scale-105 group-has-[a:focus-visible]:border-accent 
  group-has-[a:focus-visible]:bg-accent group-has-[a:focus-visible]:text-accent-foreground 
  group-has-[a:focus-visible]:shadow-xl group-has-[a:focus-visible]:shadow-accent/25"
    >
      <LinkSVG className="size-4" />
    </span>
  );
}

function Heading({
  url,
  name,
}: {
  url?: string;
  name: string;
}): React.ReactNode {
  return (
    <div className="flex items-center gap-4">
      <h3 id={name} className="font-medium">
        {name}
      </h3>
      <LinkIcon url={url} />
    </div>
  );
}

function Description({
  description,
}: {
  description: string;
}): React.ReactNode {
  return <p className="text-sm leading-6 grow">{description}</p>;
}

type TagsProps = {
  tags: TProject['tags'];
  name: TProject['name'];
};

function Tags({ tags, name }: TagsProps): React.ReactNode {
  if (!tags[0]) return null;

  return (
    <ul className="pointer-events-none flex flex-wrap items-center gap-2 text-xs">
      {tags.map((tag, i) => (
        <Fragment key={`${name}-${tag}`}>
          <li className="rounded-sm text-accent drop-shadow-md">{tag}</li>
          {i < tags.length - 1 && <span>•</span>}
        </Fragment>
      ))}
    </ul>
  );
}
