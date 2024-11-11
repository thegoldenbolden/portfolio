export type Tag =
  | 'Next.js'
  | 'Node.js'
  | 'React'
  | 'Typescript'
  | 'Side Project'
  | 'HTML5'
  | 'CSS3';

export type Project = {
  name: string;
  site?: string;
  src?: string;
  tags: Tag[];
  description: string;
  home?: boolean;
  year: string;
  status: 'now' | 'past' | 'future'
};

export const projects: Project[] = [
  {
    name: 'Wouldry',
    src: 'https://github.com/thegoldenbolden/wouldry',
    tags: ['Next.js', 'React', 'Typescript', 'Side Project'],
    description: 'Discover more about yourself with thought-provoking questions',
    year: '2023',
    status: 'past',
  },
  {
    name: 'Pokefolder',
    src: 'https://github.com/thegoldenbolden/pokefolder',
    tags: ['Next.js', 'React', 'Typescript', 'Side Project'],
    description:
      'Explore an extensive pokemon card database and find prices about any card',
    year: '2022',
    status: 'past',
  },
  {
    name: 'Portfolio',
    site: 'https://www.jacobbolden.com',
    src: 'https://github.com/thegoldenbolden/portfolio',
    tags: ['Next.js', 'React', 'Typescript', 'Side Project'],
    description: "This site that you're currently viewing",
    year: '2022',
    status: 'now',
  },
  {
    name: 'Noodle',
    src: 'https://github.com/thegoldenbolden/noodle',

    tags: ['Node.js', 'Typescript', 'Side Project'],
    description: 'A discord bot',
    year: '2020',
    status: 'past',
  },
  {
    name: 'Trivia Buddy',
    src: 'https://github.com/thegoldenbolden/triviabuddy',
    site: 'https://thegoldenbolden.github.io/trivia/',
    tags: ['HTML5', 'CSS3', 'Side Project'],
    description: 'A trivia app',
    year: '2021',
    status: 'past',
  },
];

export const socials = {
  x: 'https://x.com/thagoldenbolden',
  github: 'https://github.com/thegoldenbolden',
  spotify: 'https://open.spotify.com/user/thegoldenbolden',
  linkedin: 'https://linkedin.com/in/jbolden9',
};

export const skills = [
  'Next.js',
  'React',
  'Typescript',
  'Javascript',
  'Python',
  'Node.js',
  'PostgreSQL',
  'C#'
]