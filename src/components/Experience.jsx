import { useReveal } from '../hooks/useReveal'

const experiences = [
  {
    role: 'System Analyst',
    company: 'Deloitte',
    type: 'Internship - On Site',
    period: 'Jan 2026 – Apr 2026',
    description:
      "DevOps Engineer focused on migrating CI/CD pipelines from Azure DevOps to GitHub. My main work involves analyzing existing Azure DevOps YAML files, understanding what they do, and rewriting them for GitHub Actions. I've learned Linux, Docker, Azure cloud services, and networking concepts to properly translate and configure these pipelines. Daily work includes troubleshooting YAML syntax, understanding pipeline logic, and ensuring deployments work correctly after migration.",
  },
  {
    role: 'Full Stack Web Development Intern',
    company: 'Shinelogics',
    type: 'Internship - On Site',
    period: 'May 2024 – July 2024',
    description:
      'I have gained hands-on experience in full-stack web development using the MERN stack (MongoDB, Express.js, React.js, and Node.js), where I actively collaborated with developers to build and enhance real-world applications. Alongside development, I worked on both manual and automated testing by designing test cases, identifying and documenting bugs, and assisting in debugging to improve overall application reliability. I also contributed to ensuring smooth integration between frontend and backend components, focusing on delivering seamless and user-centric experiences while strengthening my problem-solving and teamwork skills.',
  },
]

function Experience() {
  const [ref, visible] = useReveal()

  return (
    <section id="experience" className="experience">
      <div ref={ref} className={`section__container ${visible ? 'reveal' : ''}`}>
        <h2 className="section__title">Experience</h2>
        <div className="section__title-bar"></div>

        <div className="experience__timeline">
          {experiences.map((exp, i) => (
            <div key={i} className="experience__item">
              <div className="experience__dot"></div>
              <div className="experience__card">
                <div className="experience__header">
                  <div>
                    <h3 className="experience__role">{exp.role}</h3>
                    <p className="experience__company">
                      {exp.company} <span className="experience__type">({exp.type})</span>
                    </p>
                  </div>
                  <span className="experience__period">{exp.period}</span>
                </div>
                <p className="experience__desc">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
