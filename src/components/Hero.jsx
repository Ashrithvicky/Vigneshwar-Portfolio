import { FiArrowDown, FiArrowUpRight, FiGithub, FiCode, FiCloud, FiCpu, FiTrendingUp, FiDatabase } from 'react-icons/fi'
import { useReveal } from '../hooks/useReveal'
import ProfileImage from '../assets/ProfileImage.jpeg'

const engineeringInterests = [
  { label: 'Full-stack Development', icon: FiCode },
  { label: 'Cloud & DevOps', icon: FiCloud },
  { label: 'AI Engineering', icon: FiCpu },
  { label: 'ML Engineering', icon: FiTrendingUp },
  { label: 'Data Engineering', icon: FiDatabase },
]

function Hero() {
  const [ref, visible] = useReveal(0.1)

  return (
    <section id="home" className="hero">
      <div ref={ref} className={`hero__content ${visible ? 'reveal' : ''}`}>
        <p className="hero__label"><span className="hero__status-dot" aria-hidden="true" /><strong>Software Engineer I</strong><span className="hero__company">at Deloitte</span></p>
        <h1 className="hero__name">Vigneshwar<span>.</span></h1>

        <div className="hero__intro">
          <p className="hero__statement">Thoughtful code.<br /><em>Real-world impact.</em></p>
          <p className="hero__tagline">
            I'm a <strong className="hero__role">Software Engineer I</strong> at <strong className="hero__company">Deloitte</strong>, building reliable automation and DevOps workflows.
            I migrate Selenium suites to Playwright, develop new automated tests, and work with DevOps teams
            to move Azure DevOps pipelines to GitHub Actions.
          </p>
          <p className="hero__about">
            My foundation spans full-stack development, cloud, networking, and security.
            I also explore applied AI, connecting curiosity with practical engineering to build software that solves real problems.
          </p>
          <div className="hero__actions">
            <a className="hero__cta" href="#projects">Selected work <FiArrowDown /></a>
            <a className="hero__contact" href="mailto:sivigneshwar1972@gmail.com">Let's talk <FiArrowUpRight /></a>
            <a className="hero__github icon-button" href="https://github.com/Ashrithvicky" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" title="GitHub profile"><FiGithub /></a>
          </div>
        </div>

        <figure className="hero__portrait">
          <img src={ProfileImage} alt="S I Vigneshwar" width="1110" height="1600" fetchPriority="high" />
        </figure>

        <div className="hero__footer">
          <div className="hero__footer-intro"><p className="section__eyebrow">ENGINEERING INTERESTS</p><p>Curiosity drives me.</p></div>
          <div className="hero__disciplines">
            {engineeringInterests.map((interest) => <span key={interest.label}><interest.icon aria-hidden="true" />{interest.label}</span>)}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
