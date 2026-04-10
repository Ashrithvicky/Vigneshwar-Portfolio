import { useReveal } from '../hooks/useReveal'

const languages = [
  { name: 'English', level: 'Full Proficiency', pct: 95 },
  { name: 'Hindi', level: 'Full Proficiency', pct: 95 },
  { name: 'Tamil', level: 'Full Proficiency', pct: 95 },
  { name: 'Telugu', level: 'Spoken Proficiency', pct: 70 },
]

function Languages() {
  const [ref, visible] = useReveal()

  return (
    <section id="languages" className="languages">
      <div ref={ref} className={`section__container ${visible ? 'reveal' : ''}`}>
        <h2 className="section__title">Languages</h2>
        <div className="section__title-bar"></div>

        <div className="languages__grid">
          {languages.map((lang) => (
            <div key={lang.name} className="languages__card">
              <div className="languages__bar-track">
                <div className="languages__bar-fill" style={{ width: `${lang.pct}%` }}></div>
              </div>
              <h3 className="languages__name">{lang.name}</h3>
              <p className="languages__level">{lang.level}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Languages
