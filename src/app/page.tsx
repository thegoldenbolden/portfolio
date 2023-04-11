import Image from "next/image";
import Link from "next/link";
import { GithubIcon, MailIcon, TwitterIcon } from "@components/icons";
import { getProfile } from "@lib/github";

export default async function Page() {
 const profile = await getProfile();

 return (
  <div className="space-y-6">
   <h1 className="capitalize text-2xl font-bold">Jacob Bolden</h1>
   <div className="flex mt-6 flex-col gap-6">
    <p className="max-w-[480px]">
     {`Hi, I'm Jacob. I'm a self-taught developer focusing on creating user-friendly web
    applications.`}
    </p>

    <div className="flex flex-row gap-6 items-center">
     {profile?.avatar_url && (
      <Image
       className="object-contain p-[4px] bg-tw-gray-10 hover:bg-tw-gray transition-colors rounded-full"
       src={profile.avatar_url}
       alt="jacob's profile picture"
       height={96}
       width={96}
      />
     )}
     <div className="flex flex-col gap-2 text-sm">
      <Link
       href="https://twitter.com/thagoldenbolden"
       target="_blank"
       rel="noreferrer noopener"
       className="flex gap-2 flex-wrap text-tw-gray hover:text-tw-white focus:text-tw-white"
      >
       <TwitterIcon className="w-5 h-5 text-inherit" />
       follow on twitter
      </Link>
      <Link
       href="https://github.com/thegoldenbolden"
       target="_blank"
       rel="noreferrer noopener"
       className="flex gap-2 flex-wrap text-tw-gray hover:text-tw-white focus:text-tw-white"
      >
       <GithubIcon className="w-5 h-5 text-inherit" />
       follow on github
      </Link>
      <Link
       className="flex gap-2 flex-wrap text-tw-gray hover:text-tw-white focus:text-tw-white"
       href="mailto:jlbolden9@gmail.com"
      >
       <MailIcon className="w-5 h-5 text-inheritflex gap-2 flex-wrap " />
       send a message
      </Link>
     </div>
    </div>
    <p>
     {`I am always looking for new opportunities to use my skills and expand my
    knowledge in the tech industry. If you have a position that could benefit from my experience and
    dedication, I would love to hear from you and see how we can work together. I look forward to
    hearing from you! 😀`}
    </p>

    <p className="text-sm text-tw-gray">Design inspired by Lee Robinson</p>
   </div>
  </div>
 );
}
