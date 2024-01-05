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
  tags: Tag[];
  description: string;
  home?: boolean;
  year: string;
  status: 'now' | 'past' | 'future';
};

export const projects: Project[] = [
  {
    home: true,
    name: 'Wouldry',
    site: 'https://www.wouldry.com',
    tags: ['Next.js', 'React', 'Typescript', 'Side Project'],
    description: 'Discover more about yourself with thought-provoking questions',
    year: '2023',
    status: 'now',
  },
  {
    home: true,
    name: 'Pokefolder',
    site: 'https://www.pokefolder.com',
    tags: ['Next.js', 'React', 'Typescript', 'Side Project'],
    description:
      'Explore an extensive pokemon card database and find prices about any card',
    year: '2022',
    status: 'now',
  },
  {
    home: true,
    name: 'Portfolio',
    site: 'https://www.jacobbolden.com',
    tags: ['Next.js', 'React', 'Typescript', 'Side Project'],
    description: "This site that you're currently viewing",
    year: '2022',
    status: 'now',
  },
  {
    name: 'Noodle',
    tags: ['Node.js', 'Typescript', 'Side Project'],
    description: 'A discord bot',
    year: '2020',
    status: 'past',
  },
  {
    name: 'Trivia Buddy',
    site: 'https://thegoldenbolden.github.io/trivia/',
    tags: ['HTML5', 'CSS3', 'Side Project'],
    description: 'A trivia app',
    year: '2021',
    status: 'past',
  },
];
