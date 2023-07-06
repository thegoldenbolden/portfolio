import type { AnchorHTMLAttributes } from 'react';
import {
  GithubIcon,
  InstagramIcon,
  SpotifyIcon,
  TwitterIcon,
  TwitchIcon,
} from './icons';

export const socials = {
  twitter: {
    icon: TwitterIcon,
    href: 'https://twitter.com/thagoldenbolden',
  },
  github: {
    icon: GithubIcon,
    href: 'https://github.com/thegoldenbolden',
  },
  spotify: {
    icon: SpotifyIcon,
    href: 'https://open.spotify.com/user/thegoldenbolden',
  },
  instagram: {
    icon: InstagramIcon,
    href: 'https://instagram.com/thegoldenbolden',
  },
  twitch: {
    icon: TwitchIcon,
    href: 'https://twitch.tv/thegoldenbolden',
  },
		linkedin: {
			href: 'https://linkedin.com/in/jbolden9',
			icon: null
		}
} as const;

type Social = keyof typeof socials;

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  social: Social;
};

export default function Social(props: Props) {
  const social = socials[props.social];
  const Icon = social.icon;

  return (
    <a
      rel="noreferrer noopener"
      target="_blank"
      {...props}
      href={social.href}
      className={`hover:text-foreground focus-visible:text-foreground ${
        props.className ?? ''
      }`}
    >
      <Icon className="w-7 h-7" />
    </a>
  );
}
