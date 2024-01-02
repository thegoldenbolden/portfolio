import type { Project as TProject } from '@/utils';
import { LinkIcon } from './icons';
import { Fragment } from 'react';

type Props = {
  as?: 'li' | 'div';
  project: TProject;
};

export function Project({ project, as: Component = 'li' }: Props) {
  return (
    <Component className="group relative flex grow flex-col gap-2 rounded-xl border border-primary p-6 shadow-2xl shadow-primary transition-all">
      <Year year={project.year} />
      <Link site={project.site} name={project.name} />
      <Heading name={project.name} site={project.site} />
      <Description description={project.description} />
      <Tags tags={project.tags} name={project.name} />
    </Component>
  );
}

function Year({ year }: { year?: string }) {
  if (!year) return null;

  return (
    <span className="pointer-events-none absolute -top-2.5 left-1/2 z-10 -translate-x-1/2 rounded-full border border-primary bg-background px-2 py-0.5 text-xs group-has-[a:focus-visible]:outline group-has-[a:focus-visible]:outline-2 group-has-[a:focus-visible]:outline-accent">
      {year}
    </span>
  );
}

function Link({ site, name }) {
  if (!site) return null;
  return (
    <a
      target="_blank"
      href={site}
      aria-labelledby={name}
      className="absolute left-0 top-0 h-full w-full rounded-inherit"
    />
  );
}

function Heading({ site, name }: { site?: string; name: string }) {
  return (
    <div className="flex items-center gap-4">
      <h3 id={name} className="font-medium">
        {name}
      </h3>
      {site && (
        <span
          className="-z-[1] group-has-[a:focus-visible]:text-accent-foreground ml-auto rounded-full border border-primary p-2 
        transition-all group-hover:scale-105 
        group-hover:border-primary group-hover:bg-primary 
        group-hover:text-primary-foreground group-hover:shadow-xl 
        group-hover:shadow-primary group-has-[a:focus-visible]:scale-105 
        group-has-[a:focus-visible]:border-accent group-has-[a:focus-visible]:bg-accent 
        group-has-[a:focus-visible]:shadow-xl group-has-[a:focus-visible]:shadow-accent"
        >
          <LinkIcon className="size-4" />
        </span>
      )}
    </div>
  );
}

function Description({ description }: { description: string }) {
  return <p className="text-sm leading-6">{description}</p>;
}

type TagsProps = {
  tags: TProject['tags'];
  name: TProject['name'];
};

function Tags({ tags, name }: TagsProps) {
  if (!tags[0]) return;

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
