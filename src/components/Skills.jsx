import { useReveal } from '../hooks/useReveal'

const technicalSkills = [
  'Java', 'Python', 'C#', 'SQL', 'HTML', 'CSS', 'JavaScript',
  'React js', 'Angular', '.NET Core', 'Express js', 'Node js', 'MongoDB'
]

const domains = [
  'DevOps Engineering', 'Cloud Computing',
  'Artificial Intelligence (AI) and Machine Learning (ML)',
  'Database Management Systems (DBMS)',
  'Data Structures and Algorithms',
  'Object Oriented Programming (OOPS)',
  'Networking and Security', 'Distributed Systems',
  'Operating Systems',
  'Cyber Security And Application Security',
  'Advanced Server Side Programming',
  'Advanced Predictive Analytics',
  'Data Analytics and Visualization',
  'Business and Communication Skills',
  'Analytical and Critical Thinking'
]

const tools = [
  'AWS', 'GitHub', 'Docker', 'Jenkins', 'Bootstrap',
  'Wireshark', 'Spring Boot', 'Kubernetes', 'FastAPI',
  'TensorFlow', 'Postman', 'Selenium', 'Tableau',
  'PowerBI', 'Flutter', 'MySQL', 'Hugging Face',
  'Linux OS', 'Django', 'Flask'
]

function Skills() {
  const [ref, visible] = useReveal()

  return (
    <section id="skills" className="skills">
      <div ref={ref} className={`section__container ${visible ? 'reveal' : ''}`}>
        <h2 className="section__title">Skills</h2>
        <div className="section__title-bar"></div>

        <div className="skills__grid">
          <div className="skills__col">
            <div className="skills__card">
              <h3 className="skills__card-title">Technical Skills</h3>
              <div className="skills__tags">
                {technicalSkills.map((s) => (
                  <span key={s} className="skills__tag">{s}</span>
                ))}
              </div>
            </div>

            <div className="skills__card">
              <h3 className="skills__card-title">Technologies & Tools</h3>
              <div className="skills__tags">
                {tools.map((t) => (
                  <span key={t} className="skills__tag skills__tag--tool">{t}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="skills__col">
            <div className="skills__card">
              <h3 className="skills__card-title">Domain Knowledge</h3>
              <div className="skills__tags">
                {domains.map((d) => (
                  <span key={d} className="skills__tag skills__tag--domain">{d}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
