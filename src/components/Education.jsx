import { FiBookOpen } from 'react-icons/fi'
import HorizontalGallery from './HorizontalGallery'

const education = [
  {
    institution: 'Vellore Institute of Technology, Vellore',
    state: 'Tamil Nadu',
    period: '2021 – 2026',
    degree: 'MTECH - Computer Science and Engineering',
    score: 'CGPA - 8.27',
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
  return (
    <section id="education" className="education">
      <HorizontalGallery id="education-gallery" label="Education" noun="education" eyebrow="03 / EDUCATION" title={<>A strong foundation.<em>A curious mind.</em></>}>
          {education.map((edu, i) => (
            <article key={edu.period} className={`career-card career-card--${i % 2 === 0 ? 'coral' : 'cyan'}`}>
              <div className="career-card__top"><FiBookOpen aria-hidden="true" /><span>{edu.period}</span></div>
              <p className="career-card__eyebrow">{edu.state}</p>
              <h3 className="career-card__title">{edu.institution}</h3>
              <p className="career-card__description">{edu.degree}</p>
              <p className="career-card__score">{edu.score}</p>
            </article>
          ))}
      </HorizontalGallery>
    </section>
  )
}

export default Education
