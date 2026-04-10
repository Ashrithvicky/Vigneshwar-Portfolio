import { useState, useEffect } from 'react'
import { FiSun, FiMoon } from 'react-icons/fi'

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'languages', label: 'Languages' },
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
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        <button className="navbar__logo" onClick={() => scrollTo('home')}>
          V<span className="navbar__logo-dot">.</span>
        </button>

        <div className="navbar__right">
          <ul className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  className={`navbar__link ${activeSection === item.id ? 'navbar__link--active' : ''}`}
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

          <button className="navbar__theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? <FiMoon size={18} /> : <FiSun size={18} />}
          </button>

          <button
            className={`navbar__hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
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
