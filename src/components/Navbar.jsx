import { useState, useEffect } from 'react'
import { FiSun, FiMoon } from 'react-icons/fi'

const navItems = [
  { id: 'projects', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Expertise' },
  { id: 'contact', label: 'Contact' },
]

function Navbar({ activeSection, theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    setMenuOpen(false)
    const el = document.getElementById(id)
    if (el) {
      const offset = 70
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} aria-label="Main navigation">
      <div className="navbar__inner">
        <button className="navbar__logo" onClick={() => scrollTo('home')} aria-label="Vigneshwar, home">
          <span className="navbar__monogram" aria-hidden="true">S<span>I</span></span><span className="navbar__logo-dot">/</span><span className="navbar__wordmark">Vigneshwar</span>
        </button>

        <div className="navbar__right">
          <ul id="main-navigation" className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  className={`navbar__link ${activeSection === item.id ? 'navbar__link--active' : ''}`}
                  aria-current={activeSection === item.id ? 'location' : undefined}
                  onClick={() => scrollTo(item.id)}
                >
                  {item.label}
                </button>
              </li>
            ))}
            <li className="navbar__theme-mobile">
              <button className="navbar__theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
                {theme === 'light' ? <FiMoon size={18} /> : <FiSun size={18} />}
                <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
              </button>
            </li>
          </ul>

          <button className="navbar__theme-toggle" onClick={toggleTheme} aria-label="Toggle theme" title={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}>
            {theme === 'light' ? <FiMoon size={18} /> : <FiSun size={18} />}
          </button>

          <button
            className={`navbar__hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
