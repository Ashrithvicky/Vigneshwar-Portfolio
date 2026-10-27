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
  'Linux OS', 'Django', 'Flask', 'Playwright', 'GitHub Actions', 'Azure DevOps'
]

const skillGroups = [
  { title: 'Technical Skills', items: technicalSkills, type: 'technical' },
  { title: 'Technologies & Tools', items: tools, type: 'tool' },
  { title: 'Domain Knowledge', items: domains, type: 'domain' },
]

function Skills() {
  const [ref, visible] = useReveal()

  return (
    <section id="skills" className="skills">
      <div ref={ref} className={`section__container ${visible ? 'reveal' : ''}`}>
        <h2 className="section__title">Skills</h2>
        <div className="section__title-bar"></div>

        <div className="skills__grid">
          {skillGroups.map((group) => (
            <div key={group.title} className="skills__group">
              <h3 className="skills__card-title">{group.title}</h3>
              <ul className="skills__tags">{group.items.map((skill) => <li key={skill} className={`skills__tag skills__tag--${group.type}`}>{skill}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
