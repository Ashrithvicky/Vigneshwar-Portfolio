import { useReveal } from '../hooks/useReveal'

const education = [
  {
    institution: 'Vellore Institute of Technology, Vellore',
    state: 'Tamil Nadu',
    period: '2021 – 2026',
    degree: 'MTECH5 - Computer Science and Engineering',
    score: 'CGPA - 8.3',
  },
  {
    institution: 'VVNKM SR SEC SCHOOL, Vellore',
    state: 'Tamil Nadu',
    period: '2020 – 2021',
    degree: '12th Grade CBSE',
    score: 'Percentage - 89.8',
  },
  {
    institution: 'VVNKM SR SEC SCHOOL, Vellore',
    state: 'Tamil Nadu',
    period: '2018 – 2019',
    degree: '10th Grade CBSE',
    score: 'Percentage - 86',
  },
]

function Education() {
  const [ref, visible] = useReveal()

  return (
    <section id="education" className="education">
      <div ref={ref} className={`section__container ${visible ? 'reveal' : ''}`}>
        <h2 className="section__title">Education</h2>
        <div className="section__title-bar"></div>

        <div className="education__list">
          {education.map((edu, i) => (
            <div key={i} className="education__card">
              <div className="education__left">
                <span className="education__period">{edu.period}</span>
              </div>
              <div className="education__right">
                <h3 className="education__institution">{edu.institution}</h3>
                <p className="education__degree">{edu.degree}</p>
                <span className="education__score">{edu.score}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Education
