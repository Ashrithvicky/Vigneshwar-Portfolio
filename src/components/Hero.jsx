import { useReveal } from '../hooks/useReveal'
import ProfileImage from '../assets/ProfileImage.jpeg'

function Hero() {
  const [ref, visible] = useReveal(0.1)

  return (
    <section id="home" className="hero">
      <div className="hero__bg-shapes">
        <div className="hero__shape hero__shape--1"></div>
        <div className="hero__shape hero__shape--2"></div>
        <div className="hero__shape hero__shape--3"></div>
      </div>

      <div ref={ref} className={`hero__content ${visible ? 'reveal' : ''}`}>
        <div className="hero__text">
          <p className="hero__label">DevOps Engineer & Full Stack Developer</p>
          <h1 className="hero__name">
            Hi, I'm <span className="hero__name-highlight">Vigneshwar</span><span className="hero__name-dot">.</span>
          </h1>
          <p className="hero__tagline">
            Adaptive thinker with a strong interest in building practical, real-world solutions across software and systems. I have experience in full-stack development along with a solid foundation in Cloud, Networking, and Security. I’ve actively explored AI and Machine Learning, gaining hands-on understanding of core concepts and their applications. Currently, I’m deepening my knowledge in DevOps, focusing on workflows, automation, and deployment practices. I bring strong leadership, clear communication, and the ability to perform under pressure, backed by a sharp problem-solving mindset and a continuous drive to learn and improve.   
          </p>

          <div className="hero__actions">
            <button className="hero__cta" onClick={() => {
              const el = document.getElementById('contact')
              if (el) {
                const top = el.getBoundingClientRect().top + window.scrollY - 70
                window.scrollTo({ top, behavior: 'smooth' })
              }
            }}>
              Get In Touch
            </button>
          </div>
        </div>

        <div className="hero__image">
          <div className="hero__image-placeholder">
            <img src={ProfileImage} alt="S I Vigneshwar" onError={(e) => { e.target.style.display = 'none' }} />
            <span className="hero__image-initials"></span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
