const skills = [
  'Javascript',
  'Typescript',
  'HTML5',
  'CSS',
  'Python',
  'Sass',
  'Node.js',
  'React',
  'Next.js',
  'Express.js',
  'Prisma',
  'TailwindCSS',
  'Git',
  'Heroku',
  'Github',
  'Netlify',
  'Vercel',
  'Docker',
  'Kubernetes',
  'AWS',
  'Figma',
  'Framer',
  'Adobe XD',
  'PostgreSQL',
  'MySQL',
  'MS Office',
  'Google Sheets',
];

const experience = [
  {
    h3: 'Intern — Methodist University Hospital',
    li: [
      'Identified and presented potential risks and inconsistencies in the database through clear and concise visual aids during meetings',
      'Improved daily efficiency by streasm:mlining the process of populating tables in Microsoft Excel',
      'Analyzed data and results from previous quarters and other institutions to identify trends or areas for improvement',
    ],
  },
];

const certifications = ['The Complete 2022 Web Development Bootcamp'];

const education = ['Univeristy of Memphis  — B.S. Health Sciences'];

export default function Page() {
  return (
    <>
      <h1 className="text-2xl font-bold">Jacob Bolden</h1>
      <section className="flex flex-col gap-4">
        <p>
          Next.js developer with a passion for creating user-friendly web
          applications. Specializing in building accessible and visually
          appealing interfaces using a diverse range of technologies
        </p>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Experience</h2>
        <ul>
          {experience.map((exp) => (
            <li className="px-4" key={exp.h3}>
              <h3 className="-ml-4">{exp.h3}</h3>
              <ul className="list-disc">
                {exp.li.map((li, i) => (
                  <li key={`${exp.h3}-${i}`}>{li}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Skills</h2>
        <ul className="list-disc columns-2  px-4 sm:columns-3">
          {skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Certifications</h2>
        <ul className="list-disc px-4">
          {certifications.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Education</h2>
        <ul className="list-disc px-4">
          {education.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </section>
    </>
  );
}
