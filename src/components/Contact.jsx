import { FiMail, FiPhone, FiMapPin, FiArrowUpRight } from 'react-icons/fi'
import { FaLinkedinIn, FaGithub } from 'react-icons/fa'
import { useReveal } from '../hooks/useReveal'

function Contact() {
  const [ref, visible] = useReveal()

  return (
    <section id="contact" className="contact">
      <div ref={ref} className={`section__container ${visible ? 'reveal' : ''}`}>
        <p className="contact__wave">Get in touch at</p>
        <a href="mailto:sivigneshwar1972@gmail.com" className="contact__big-email">
          sivigneshwar1972@gmail.com <FiArrowUpRight className="contact__email-arrow" />
        </a>

        <div className="contact__bottom">
          <div className="contact__details">
            <a href="tel:+918838565625" className="contact__detail-row">
              <span className="contact__detail-icon"><FiPhone /></span>
              <div>
                <span className="contact__detail-label">Phone</span>
                <span className="contact__detail-value">+91 8838565625</span>
              </div>
              <FiArrowUpRight className="contact__detail-arrow" />
            </a>

            <div className="contact__detail-row contact__detail-row--static">
              <span className="contact__detail-icon"><FiMapPin /></span>
              <div>
                <span className="contact__detail-label">Location</span>
                <span className="contact__detail-value">Vellore, Tamil Nadu</span>
              </div>
            </div>
          </div>

          <div className="contact__socials-links">
            <a
              href="https://www.linkedin.com/in/sivigneshwar2706"
              target="_blank"
              rel="noopener noreferrer"
              className="contact__social-card"
            >
              <FaLinkedinIn className="contact__social-icon" />
              <span className="contact__social-name">LinkedIn</span>
              <FiArrowUpRight className="contact__detail-arrow" />
            </a>

            <a
              href="https://github.com/Ashrithvicky"
              target="_blank"
              rel="noopener noreferrer"
              className="contact__social-card"
            >
              <FaGithub className="contact__social-icon" />
              <span className="contact__social-name">GitHub</span>
              <FiArrowUpRight className="contact__detail-arrow" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
