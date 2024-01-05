import type { Metadata } from 'next';
import Link from 'next/link';
import { projects, skills, socials } from '@repo/utils';
import {
  GithubIcon,
  LinkedinIcon,
  GlobalIcon,
  MailIcon,
  PrinterIcon,
} from '@repo/ui/icons';
import { PrintButton } from '~/components/print-button';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

export default function Page(): React.ReactNode {
  return (
    <main className="flex flex-col gap-8 p-4 leading-tight md:p-16">
      <section className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold">Jacob Bolden</h1>
        <p className="max-w-sm text-lg text-foreground/60">
          Developer focusing on building accessible web applications
        </p>
        <div className="flex items-center gap-1 self-start text-sm print:flex-col print:items-start print:gap-0.5 print:text-xs">
          <a
            target="_blank"
            rel="noreferrer noopener"
            href="mailto:jlbolden9@gmail.com"
            className="rounded-md border border-foreground/10 p-2 hover:bg-foreground/5 motion-safe:transition-colors print:border-none print:p-0"
          >
            <span className="hidden print:block">jlbolden9@gmail.com</span>
            <MailIcon className="block size-5 print:hidden" />
          </a>
          <a
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-md border border-foreground/10 p-2 hover:bg-foreground/5 motion-safe:transition-colors print:hidden print:p-0"
            href={socials.github}
          >
            <GithubIcon className="size-5" />
          </a>
          <a
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-md border border-foreground/10 p-2 hover:bg-foreground/5 motion-safe:transition-colors print:hidden print:p-0"
            href={socials.linkedin}
          >
            <LinkedinIcon className="size-5" />
          </a>
          <a
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-md border border-foreground/10 p-2 hover:bg-foreground/5 motion-safe:transition-colors print:hidden print:p-0"
            href="https://jacobbolden.com"
          >
            <GlobalIcon className="size-5" />
          </a>
          <PrintButton className="rounded-md border border-foreground/10 p-2 hover:bg-foreground/5 motion-safe:transition-colors print:hidden print:p-0">
            <PrinterIcon className="size-5" />
          </PrintButton>
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">About</h2>
        <p className="text-sm text-foreground/60">
          As a web developer, I build web applications with a special attention
          towards accessibility and user experience. Currently, I work with
          Next.js, React, Typescript, and Node.js.
        </p>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Experience</h2>
        <ul>
          <li className="flex flex-col gap-2">
            <div>
              <h3 className="font-semibold">Methodist Le Bonheur Healthcare</h3>
              <h4 className="mb-auto text-sm tracking-wider">
                Quality Control Intern
              </h4>
            </div>
            <p className="text-sm text-foreground/60">
              Identified and presented potential risks and inconsistencies in
              data, analyzed data from previous quarters and other institutions
              to identify trends or areas for improvement.
            </p>
          </li>
        </ul>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Education</h2>
        <ul>
          <li>
            <h3 className="font-semibold">University of Memphis</h3>
            <p className="text-sm text-foreground/60">
              Bachelor&apos;s degree in Health Studies
            </p>
          </li>
        </ul>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Certifications</h2>
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          <li className="rounded-md border border-foreground/10 p-4 print:border-none print:p-0">
            <h3 className="font-semibold">
              <Link
                target="_blank"
                rel="noreferrer noopener"
                className="hover:underline"
                href="https://www.freecodecamp.org/certification/thegoldenbolden/foundational-c-sharp-with-microsoft"
              >
                Foundational C#
              </Link>
            </h3>
            <p className="text-sm text-foreground/60">Microsoft</p>
          </li>
          <li className="rounded-md border border-foreground/10 p-4 print:border-none print:p-0">
            <h3 className="font-semibold">Web Development</h3>
            <p className="text-sm text-foreground/60">Udemy</p>
          </li>
        </ul>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Skills</h2>
        <ul className="flex items-center gap-1">
          {skills.map((skill) => {
            return (
              <li
                key={`skills-${skill}`}
                className="inline rounded-sm border border-foreground/10 bg-foreground/5 px-1 py-0.5 text-xs text-foreground print:border-none print:p-0 print:px-0 print:py-0"
              >
                {skill}
              </li>
            );
          })}
        </ul>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Projects</h2>
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 print:sm:grid-cols-3 md:grid-cols-3">
          {projects.map((project) => {
            return (
              <li
                key={project.name}
                className="relative flex flex-col gap-3 rounded-md border border-foreground/10 p-4 print:border-none print:p-0 print:py-3"
              >
                <h3 className="text-[15px] font-medium">
                  {project.site ? (
                    <Link
                      target="_blank"
                      rel="noreferrer noopener"
                      className="hover:underline focus-visible:underline"
                      href={project.site}
                    >
                      {project.name}
                    </Link>
                  ) : (
                    <>{project.name}</>
                  )}
                </h3>
                <p className="text-[11px] text-foreground/60">
                  {project.description}
                </p>
                <ul className="mt-auto flex flex-wrap items-center gap-1">
                  {project.tags.map((tag) => {
                    return (
                      <li
                        key={`${project.name}-${tag}`}
                        className="rounded-sm bg-foreground/10 px-1 py-0.5 text-[10px] print:px-0 print:py-0"
                      >
                        {tag}
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
