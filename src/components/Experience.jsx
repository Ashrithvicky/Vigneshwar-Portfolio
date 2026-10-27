import { FiCode, FiGitBranch, FiLayers } from 'react-icons/fi'
import HorizontalGallery from './HorizontalGallery'

const experiences = [
  {
    role: 'Software Engineer I',
    company: 'Deloitte',
    type: 'Full Time',
    period: 'Jun 2026 – Present',
    icon: FiCode,
    focus: 'DevOps / Automation',
    description:
      'Building and maintaining Playwright automation, migrating test scripts from Selenium to Playwright, and developing new scripts for application workflows. Collaborating closely with the DevOps team on CI/CD pipeline migration from Azure DevOps to GitHub Actions, connecting test automation with pipeline configuration and consistent engineering workflows.',
  },
  {
    role: 'System Analyst',
    company: 'Deloitte',
    type: 'Internship - On Site',
    period: 'Jan 2026 – Apr 2026',
    icon: FiGitBranch,
    focus: 'Cloud / CI/CD',
    description:
      "DevOps Engineer focused on migrating CI/CD pipelines from Azure DevOps to GitHub. My main work involves analyzing existing Azure DevOps YAML files, understanding what they do, and rewriting them for GitHub Actions. I've learned Linux, Docker, Azure cloud services, and networking concepts to properly translate and configure these pipelines. Daily work includes troubleshooting YAML syntax, understanding pipeline logic, and ensuring deployments work correctly after migration.",
  },
  {
    role: 'Full Stack Web Development Intern',
    company: 'Shinelogics',
    type: 'Internship - On Site',
    period: 'May 2024 – July 2024',
    icon: FiLayers,
    focus: 'Full Stack / Quality',
    description:
      'I have gained hands-on experience in full-stack web development using the MERN stack (MongoDB, Express.js, React.js, and Node.js), where I actively collaborated with developers to build and enhance real-world applications. Alongside development, I worked on both manual and automated testing by designing test cases, identifying and documenting bugs, and assisting in debugging to improve overall application reliability. I also contributed to ensuring smooth integration between frontend and backend components, focusing on delivering seamless and user-centric experiences while strengthening my problem-solving and teamwork skills.',
  },
]

function Experience() {
  return (
    <section id="experience" className="experience">
      <HorizontalGallery id="experience-gallery" label="Experience" noun="experience" eyebrow="02 / EXPERIENCE" title={<>Learning by building.<em>Growing through delivery.</em></>}>
          {experiences.map((experience, index) => (
            <article key={`${experience.role}-${experience.company}`} className={`career-card career-card--${index % 2 === 0 ? 'cyan' : 'coral'}`}>
              <div className="career-card__top"><experience.icon aria-hidden="true" /><span>{experience.period}</span></div>
              <p className="career-card__eyebrow">{experience.focus}</p>
              <h3 className="career-card__title">{experience.role}</h3>
              <p className="career-card__company">{experience.company}<span>{experience.type}</span></p>
              <p className="career-card__description">{experience.description}</p>
            </article>
          ))}
      </HorizontalGallery>
    </section>
  )
}

export default Experience
