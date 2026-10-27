import { useReveal } from '../hooks/useReveal'

const languages = ['English', 'Hindi', 'Tamil', 'Telugu']

function Languages() {
  const [ref, visible] = useReveal()

  return (
    <section id="languages" className="languages">
      <div ref={ref} className={`section__container ${visible ? 'reveal' : ''}`}>
        <h2 className="section__title">Languages</h2>
        <div className="section__title-bar"></div>

        <div className="languages__grid">
          {languages.map((lang) => (
            <div key={lang} className="languages__card">
              <h3 className="languages__name">{lang}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Languages
