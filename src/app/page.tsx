import { GithubIcon, MailIcon, TwitterIcon } from '@components/icons';
import StyledLink from '@components/link/styled';
import Avatar from '@components/avatar';

export default async function Page() {
  return (
    <div className="space-y-6">
      <h1 className="capitalize text-2xl font-bold">Jacob Bolden</h1>
      <div className="flex mt-6 flex-col gap-6">
        <p className="max-w-[480px]">
          Hi, I&apos;m Jacob. I&apos;m a self-taught developer focusing on
          creating user-friendly web applications.
        </p>
        <div className="flex flex-wrap gap-6 items-center">
          <Avatar />
          <div className="flex flex-col gap-2 text-sm">
            <StyledLink
              href="https://twitter.com/thagoldenbolden"
              target="_blank"
              rel="noreferrer noopener"
              className="flex gap-2 flex-wrap text-tw-gray hover:text-tw-black focus-visible:text-tw-black dark:hover:text-tw-white dark:focus-visible:text-tw-white"
            >
              <TwitterIcon className="w-5 h-5 text-inherit" />
              follow on twitter
            </StyledLink>
            <StyledLink
              href="https://github.com/thegoldenbolden"
              target="_blank"
              rel="noreferrer noopener"
              className="flex gap-2 flex-wrap text-tw-gray hover:text-tw-black focus-visible:text-tw-black dark:hover:text-tw-white dark:focus-visible:text-tw-white"
            >
              <GithubIcon className="w-5 h-5 text-inherit" />
              follow on github
            </StyledLink>
            <StyledLink
              className="flex gap-2 flex-wrap text-tw-gray hover:text-tw-black focus-visible:text-tw-black dark:hover:text-tw-white dark:focus-visible:text-tw-white"
              href="mailto:jlbolden9@gmail.com"
            >
              <MailIcon className="w-5 h-5 text-inheritflex gap-2 flex-wrap " />
              send a message
            </StyledLink>
          </div>
        </div>
        <p>
          I am always looking for new opportunities to use my skills and expand
          my knowledge in the tech industry. If you have a position that could
          benefit from my experience and dedication, I would love to hear from
          you and see how we can work together. I look forward to hearing from
          you! 😀
        </p>

        <p className="text-sm text-tw-gray">Design inspired by Lee Robinson</p>
      </div>
    </div>
  );
}
