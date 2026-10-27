import { FiAward, FiCloud, FiCode, FiArrowUpRight } from 'react-icons/fi'
import { useReveal } from '../hooks/useReveal'
import { resolveExternalUrl } from '../utils/links'

const certifications = [
  { title: 'Professional Machine Learning Engineer', provider: 'Google Cloud', category: 'Cloud Certification', icon: FiAward, driveUrl: 'https://drive.google.com/file/d/1ho8lC5P3WMyBv4IoS4ytgv7RYDVK1lbn/view?usp=sharing' },
  { title: 'Cloud with Amazon Bedrock', provider: 'Amazon Bedrock', category: 'Cloud & Generative AI', icon: FiCloud, driveUrl: 'https://drive.google.com/file/d/1-dtfTCH4Lz0fTBSNEZIS8iv--DNYm9rB/view?usp=sharing' },
  { title: 'Playwright Automation', provider: 'Udemy', category: 'Test Automation', icon: FiCode, driveUrl: '' },
]

function Certifications({ items = certifications }) {
  const [ref, visible] = useReveal()

  return (
    <section id="certifications" className="certifications">
      <div ref={ref} className={`section__container ${visible ? 'reveal' : ''}`}>
        <p className="section__eyebrow">04 / CONTINUOUS LEARNING</p>
        <h2 className="section__title">Certifications</h2>
        <div className="section__title-bar" />
        <div className="certifications__grid">
          {items.map((certification) => {
            const driveUrl = resolveExternalUrl(certification.driveUrl, 'drive.google.com')
            return (
            <article key={certification.title} className="certifications__card">
              <certification.icon className="certifications__icon" aria-hidden="true" />
              <p className="certifications__provider">{certification.provider}</p>
              <h3>{certification.title}</h3>
              <p className="certifications__category">{certification.category}</p>
              {driveUrl ? <a className="card-link certifications__link" href={driveUrl} target="_blank" rel="noopener noreferrer" aria-label={`View ${certification.title} on Google Drive`}>View certificate <FiArrowUpRight aria-hidden="true" /></a> : <span className="certifications__pending">Certificate link pending</span>}
            </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Certifications