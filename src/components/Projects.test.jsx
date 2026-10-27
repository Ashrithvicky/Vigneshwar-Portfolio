import React from 'react'
import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import Projects from './Projects'
import App from '../App'
import Navbar from './Navbar'
import Experience from './Experience'
import Education from './Education'
import Languages from './Languages'
import CustomCursor from './CustomCursor'
import CosmicBackground from './CosmicBackground'
import Skills from './Skills'
import Certifications from './Certifications'

let viewportWidth
let resizeCallback
let reducedMotion
const scrollBy = vi.fn(function ({ left }) {
  this.scrollLeft = Math.max(0, Math.min(this.scrollLeft + left, this.scrollWidth - this.clientWidth))
  fireEvent.scroll(this)
})
const scrollTo = vi.fn(function ({ left }) {
  this.scrollLeft = left
  fireEvent.scroll(this)
})

beforeEach(() => {
  viewportWidth = 960
  reducedMotion = false
  vi.stubGlobal('IntersectionObserver', class {
    constructor(callback) { this.callback = callback }
    observe() { this.callback([{ isIntersecting: true }]) }
    unobserve() {}
    disconnect() {}
  })
  vi.stubGlobal('ResizeObserver', class {
    constructor(callback) { resizeCallback = callback }
    observe() {}
    disconnect() {}
  })
  vi.stubGlobal('matchMedia', () => ({ matches: reducedMotion }))
  vi.stubGlobal('localStorage', { getItem: vi.fn(() => null), setItem: vi.fn() })
  vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
  vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockImplementation(() => viewportWidth)
  vi.spyOn(HTMLElement.prototype, 'scrollWidth', 'get').mockReturnValue(1944)
  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({ width: 468, top: 200 })
  const getComputedStyle = window.getComputedStyle.bind(window)
  vi.spyOn(window, 'getComputedStyle').mockImplementation((element) => {
    const style = getComputedStyle(element)
    Object.defineProperty(style, 'columnGap', { value: '24px' })
    return style
  })
  HTMLElement.prototype.scrollBy = scrollBy
  HTMLElement.prototype.scrollTo = scrollTo
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
  scrollBy.mockClear()
  scrollTo.mockClear()
  document.documentElement.removeAttribute('data-theme')
})

describe('project gallery', () => {
  it('starts with two projects and an unavailable previous control', () => {
    render(<Projects />)
    expect(screen.getAllByRole('article')).toHaveLength(4)
    expect(screen.getByRole('button', { name: 'Previous projects' }).disabled).toBe(true)
    expect(screen.getByRole('button', { name: 'Next projects' }).disabled).toBe(false)
    expect(screen.getByRole('status').textContent).toContain('01 — 02 / 04')
  })

  it('moves to the remaining pair and back without wrapping', () => {
    render(<Projects />)
    fireEvent.click(screen.getByRole('button', { name: 'Next projects' }))
    expect(scrollBy).toHaveBeenLastCalledWith({ left: 984, behavior: 'smooth' })
    expect(screen.getByRole('status').textContent).toContain('03 — 04 / 04')
    expect(screen.getByRole('button', { name: 'Next projects' }).disabled).toBe(true)
    fireEvent.click(screen.getByRole('button', { name: 'Previous projects' }))
    expect(screen.getByRole('status').textContent).toContain('01 — 02 / 04')
  })

  it('supports arrow, Home, and End keys on the gallery', () => {
    render(<Projects />)
    const gallery = screen.getByRole('region', { name: 'Selected projects' })
    fireEvent.keyDown(gallery, { key: 'ArrowRight' })
    expect(scrollBy).toHaveBeenLastCalledWith({ left: 984, behavior: 'smooth' })
    fireEvent.keyDown(gallery, { key: 'ArrowLeft' })
    expect(scrollBy).toHaveBeenLastCalledWith({ left: -984, behavior: 'smooth' })
    fireEvent.keyDown(gallery, { key: 'End' })
    expect(scrollTo).toHaveBeenLastCalledWith({ left: 984, behavior: 'smooth' })
    fireEvent.keyDown(gallery, { key: 'Home' })
    expect(scrollTo).toHaveBeenLastCalledWith({ left: 0, behavior: 'smooth' })
    fireEvent.keyDown(gallery, { key: 'Tab' })
    expect(scrollTo).toHaveBeenCalledTimes(2)
  })

  it('updates its range for a one-card viewport', () => {
    viewportWidth = 468
    render(<Projects />)
    expect(screen.getByRole('status').textContent).toContain('01 / 04')
    fireEvent.click(screen.getByRole('button', { name: 'Next projects' }))
    expect(screen.getByRole('status').textContent).toContain('02 / 04')
  })

  it('recomputes the visible range after resizing', () => {
    render(<Projects />)
    viewportWidth = 468
    fireEvent(window, new Event('resize'))
    act(() => resizeCallback())
    fireEvent.scroll(screen.getByRole('region', { name: 'Selected projects' }))
    expect(screen.getByRole('status').textContent).toContain('01 / 04')
  })

  it('does not animate scrolling when reduced motion is requested', () => {
    reducedMotion = true
    render(<Projects />)
    fireEvent.click(screen.getByRole('button', { name: 'Next projects' }))
    expect(scrollBy).toHaveBeenLastCalledWith({ left: 984, behavior: 'instant' })
  })
})

describe('career and language updates', () => {
  it.each([[Experience, 'Experience'], [Education, 'Education']])('supports horizontal navigation in %s', (Section, label) => {
    render(<Section />)
    const gallery = screen.getByRole('region', { name: label })
    expect(within(gallery).getAllByRole('article')).toHaveLength(3)
    expect(screen.getByRole('button', { name: `Previous ${label.toLowerCase()}` }).disabled).toBe(true)
    fireEvent.click(screen.getByRole('button', { name: `Next ${label.toLowerCase()}` }))
    expect(scrollBy).toHaveBeenLastCalledWith({ left: 984, behavior: 'smooth' })
    fireEvent.keyDown(gallery, { key: 'Home' })
    expect(scrollTo).toHaveBeenLastCalledWith({ left: 0, behavior: 'smooth' })
  })

  it('presents the current Deloitte engineering role and automation work', () => {
    render(<Experience />)
    const currentRole = screen.getByRole('heading', { name: 'Software Engineer I' }).closest('article')
    expect(currentRole.textContent).toContain('Jun 2026')
    expect(currentRole.textContent).toContain('Present')
    expect(currentRole.textContent).toContain('Selenium to Playwright')
    expect(currentRole.textContent).toContain('Azure DevOps to GitHub Actions')
  })

  it('lists languages without proficiency bars or rankings', () => {
    render(<Languages />)
    for (const language of ['English', 'Hindi', 'Tamil', 'Telugu']) {
      expect(screen.getByRole('heading', { name: language })).toBeTruthy()
    }
    expect(document.querySelector('.languages__bar-track')).toBeNull()
    expect(screen.queryByText(/proficiency/i)).toBeNull()
  })
})

describe('portfolio surrounding the gallery', () => {
  it('renders the portrait, stars, page landmarks, and project entry link', () => {
    render(<App />)
    expect(screen.getByRole('main')).toBeTruthy()
    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeTruthy()
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Vigneshwar.')
    expect(screen.getByRole('img', { name: 'S I Vigneshwar' }).getAttribute('fetchpriority')).toBe('high')
    expect(document.querySelectorAll('.hero__stars span')).toHaveLength(550)
    expect(screen.getByRole('link', { name: /Selected work/ }).getAttribute('href')).toBe('#projects')
    expect(document.documentElement.dataset.theme).toBe('dark')
  })

  it('restores a saved theme and toggles in both directions', () => {
    localStorage.getItem.mockReturnValue('light')
    render(<App />)
    expect(document.documentElement.dataset.theme).toBe('light')
    const toggle = screen.getAllByRole('button', { name: 'Toggle theme', exact: true }).at(-1)
    fireEvent.click(toggle)
    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(localStorage.setItem).toHaveBeenLastCalledWith('portfolio-theme', 'dark')
    fireEvent.click(toggle)
    expect(document.documentElement.dataset.theme).toBe('light')
  })

  it('opens the mobile menu and closes it when navigating', () => {
    render(<App />)
    const menu = screen.getByRole('button', { name: 'Toggle menu' })
    fireEvent.click(menu)
    expect(menu.getAttribute('aria-expanded')).toBe('true')
    fireEvent.click(screen.getByRole('button', { name: 'Expertise' }))
    expect(menu.getAttribute('aria-expanded')).toBe('false')
    expect(window.scrollTo).toHaveBeenLastCalledWith({ top: 130, behavior: 'smooth' })
    fireEvent.click(screen.getByRole('button', { name: 'Vigneshwar, home' }))
    expect(window.scrollTo).toHaveBeenCalledTimes(2)
  })

  it('updates the active project link and navigation surface after scrolling', () => {
    render(<App />)
    const projectSection = document.getElementById('projects')
    Object.defineProperty(projectSection, 'offsetTop', { value: 100 })
    Object.defineProperty(projectSection, 'offsetHeight', { value: 600 })
    vi.spyOn(window, 'scrollY', 'get').mockReturnValue(120)
    fireEvent.scroll(window)
    expect(screen.getByRole('button', { name: 'Work' }).getAttribute('aria-current')).toBe('location')
    expect(screen.getByRole('navigation').classList.contains('navbar--scrolled')).toBe(true)
  })

  it('ignores a navigation target that is not mounted', () => {
    render(<Navbar activeSection="home" theme="dark" toggleTheme={() => {}} />)
    fireEvent.click(screen.getByRole('button', { name: 'Work' }))
    expect(window.scrollTo).not.toHaveBeenCalled()
  })
})

describe('starfield and presentation refinements', () => {
  const exampleProject = {
    title: 'Example application', name: 'Example application', category: 'TEST', visual: 'medical',
    icon: () => null, flow: ['Client', 'API'], tech: 'React', description: 'A project used for isolated link tests.',
    repositoryUrl: 'https://github.com/example/application',
  }

  it('renders only animated star dots, without photographs or connecting lines', () => {
    render(<CosmicBackground />)
    expect(document.querySelectorAll('.hero__stars span')).toHaveLength(550)
    expect(document.querySelectorAll('.hero__stars span:not(.hero__star--light-extra)')).toHaveLength(500)
    expect(document.querySelectorAll('.hero__star--light-extra')).toHaveLength(50)
    expect(document.querySelector('.cosmos__photograph')).toBeNull()
    expect(document.querySelector('.cosmos__constellations')).toBeNull()
    expect(document.querySelector('.cosmos img')).toBeNull()
  })

  it('provides a full-card repository link when a project URL is configured', () => {
    render(<Projects items={[exampleProject]} />)
    const repository = screen.getByRole('link', { name: 'View Example application on GitHub' })
    expect(repository.getAttribute('href')).toBe(exampleProject.repositoryUrl)
    expect(repository.getAttribute('rel')).toContain('noopener')
    expect(repository.closest('article')).toBeTruthy()
    expect(repository.classList.contains('projects__repository-link')).toBe(true)
  })

  it.each(['', 'javascript:alert(1)', 'https://example.com/not-a-repository'])('does not invent or enable an invalid repository URL: %s', (repositoryUrl) => {
    render(<Projects items={[{ ...exampleProject, repositoryUrl }]} />)
    expect(screen.queryByRole('link', { name: /on GitHub/ })).toBeNull()
    expect(screen.getByText('Repository pending')).toBeTruthy()
  })

  it('places the three supplied certifications between education and languages', () => {
    render(<App />)
    const section = document.getElementById('certifications')
    expect(section).not.toBeNull()
    expect(document.getElementById('education').compareDocumentPosition(section) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(section.compareDocumentPosition(document.getElementById('languages')) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    for (const title of ['Professional Machine Learning Engineer', 'Cloud with Amazon Bedrock', 'Playwright Automation']) {
      expect(within(section).getByRole('heading', { name: title })).toBeTruthy()
    }
  })

  it('keeps all three skill groups as aligned siblings', () => {
    render(<Skills />)
    const groups = document.querySelectorAll('.skills__group')
    expect(groups).toHaveLength(3)
    expect(new Set([...groups].map(group => group.parentElement)).size).toBe(1)
    expect(screen.getByText('Playwright')).toBeTruthy()
  })

  it('highlights the role and presents all requested engineering interests', () => {
    render(<App />)
    const hero = document.getElementById('home')
    expect(within(hero).getAllByText('Software Engineer I', { selector: 'strong' })).toHaveLength(2)
    for (const interest of ['Full-stack Development', 'Cloud & DevOps', 'AI Engineering', 'ML Engineering', 'Data Engineering']) {
      expect(within(hero).getByText(interest)).toBeTruthy()
    }
  })
})

describe('section consistency and certificate links', () => {
  const certificate = { title: 'Example certificate', provider: 'Example provider', category: 'Cloud', icon: () => null, driveUrl: 'https://drive.google.com/file/d/example/view' }

  it('uses the section names as the main gallery headings', () => {
    render(<App />)
    for (const section of ['Projects', 'Experience', 'Education']) {
      expect(screen.getByRole('heading', { name: section, level: 2 })).toBeTruthy()
    }
  })

  it('uses the S I initials and removes the duplicate portrait caption', () => {
    render(<App />)
    const logo = screen.getByRole('button', { name: 'Vigneshwar, home' })
    expect(logo.querySelector('.navbar__monogram').textContent).toBe('SI')
    expect(document.querySelector('.hero__portrait figcaption')).toBeNull()
    expect(document.querySelectorAll('.hero__disciplines svg')).toHaveLength(5)
  })

  it('links the whole certificate card to a configured Google Drive document', () => {
    render(<Certifications items={[certificate]} />)
    const link = screen.getByRole('link', { name: 'View Example certificate on Google Drive' })
    expect(link.getAttribute('href')).toBe(certificate.driveUrl)
    expect(link.getAttribute('target')).toBe('_blank')
    expect(link.getAttribute('rel')).toContain('noopener')
    expect(link.classList.contains('card-link')).toBe(true)
    expect(link.closest('article')).toBeTruthy()
  })

  it.each(['', 'javascript:alert(1)', 'https://example.com/certificate', 'not a URL'])('leaves unsafe or missing Drive URLs inactive: %s', (driveUrl) => {
    render(<Certifications items={[{ ...certificate, driveUrl }]} />)
    expect(screen.queryByRole('link')).toBeNull()
    expect(screen.getByText('Certificate link pending')).toBeTruthy()
  })
})

describe('luminous cursor', () => {
  it('tracks a mouse, highlights controls, and hides on blur', () => {
    vi.stubGlobal('matchMedia', () => ({ matches: true }))
    render(<><CustomCursor /><button>Cursor target</button></>)
    const cursor = document.querySelector('.custom-cursor')
    fireEvent(document.body, new MouseEvent('pointermove', { bubbles: true, clientX: 120, clientY: 80 }))
    expect(cursor.dataset.visible).toBe('true')
    expect(cursor.style.getPropertyValue('--cursor-x')).toBe('120px')
    expect(cursor.style.getPropertyValue('--cursor-y')).toBe('80px')
    expect(cursor.dataset.interactive).toBe('false')
    fireEvent(screen.getByRole('button', { name: 'Cursor target' }), new MouseEvent('pointermove', { bubbles: true, clientX: 140, clientY: 90 }))
    expect(cursor.dataset.interactive).toBe('true')
    expect(document.documentElement.dataset.customCursor).toBe('true')
    fireEvent.blur(window)
    expect(cursor.dataset.visible).toBe('false')
    expect(document.documentElement.hasAttribute('data-custom-cursor')).toBe(false)
  })

  it('keeps the native cursor on coarse pointers and reduced-motion devices', () => {
    render(<CustomCursor />)
    fireEvent(document.body, new MouseEvent('pointermove', { bubbles: true, clientX: 20, clientY: 30 }))
    expect(document.querySelector('.custom-cursor').dataset.visible).toBe('false')
    expect(document.documentElement.hasAttribute('data-custom-cursor')).toBe(false)
  })

  it('hides after leaving the page or changing pointer preferences and cleans up', () => {
    let preferenceChanged
    const removeListener = vi.fn()
    vi.stubGlobal('matchMedia', () => ({ matches: true, addEventListener: (name, callback) => { preferenceChanged = callback }, removeEventListener: removeListener }))
    const { unmount } = render(<CustomCursor />)
    fireEvent(document.body, new MouseEvent('pointermove', { bubbles: true }))
    fireEvent(document, new Event('pointerleave'))
    expect(document.querySelector('.custom-cursor').dataset.visible).toBe('false')
    fireEvent(document.body, new MouseEvent('pointermove', { bubbles: true }))
    preferenceChanged()
    expect(document.documentElement.hasAttribute('data-custom-cursor')).toBe(false)
    fireEvent(document.body, new MouseEvent('pointermove', { bubbles: true }))
    const touch = new Event('pointermove', { bubbles: true })
    Object.defineProperty(touch, 'pointerType', { value: 'touch' })
    fireEvent(document.body, touch)
    expect(document.querySelector('.custom-cursor').dataset.visible).toBe('false')
    unmount()
    expect(removeListener).toHaveBeenCalledWith('change', preferenceChanged)
    expect(document.documentElement.hasAttribute('data-custom-cursor')).toBe(false)
  })
})