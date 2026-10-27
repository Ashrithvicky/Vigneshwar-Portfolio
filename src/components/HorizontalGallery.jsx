import { Children, useEffect, useRef, useState } from 'react'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import { useReveal } from '../hooks/useReveal'

function HorizontalGallery({ id, label, noun, eyebrow, title, children }) {
  const [ref, visible] = useReveal()
  const trackRef = useRef(null)
  const itemCount = Children.count(children)
  const [range, setRange] = useState({ first: 1, last: Math.min(2, itemCount), previous: false, next: itemCount > 2, progress: 0 })

  useEffect(() => {
    const track = trackRef.current
    const updateRange = () => {
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0
      const step = track.firstElementChild.getBoundingClientRect().width + gap
      const maximum = Math.max(0, track.scrollWidth - track.clientWidth)
      const first = Math.min(itemCount, Math.round(track.scrollLeft / step) + 1)
      const count = Math.max(1, Math.round((track.clientWidth + gap) / step))
      setRange({
        first,
        last: Math.min(itemCount, first + count - 1),
        previous: track.scrollLeft > 2,
        next: track.scrollLeft < maximum - 2,
        progress: maximum ? Math.min(1, Math.max(0, track.scrollLeft / maximum)) : 0,
      })
    }
    const observer = new ResizeObserver(updateRange)
    observer.observe(track)
    track.addEventListener('scroll', updateRange, { passive: true })
    updateRange()
    return () => {
      observer.disconnect()
      track.removeEventListener('scroll', updateRange)
    }
  }, [itemCount])

  const behavior = () => matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
  const move = (direction) => {
    const track = trackRef.current
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0
    track.scrollBy({ left: direction * (track.clientWidth + gap), behavior: behavior() })
  }
  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault()
      move(event.key === 'ArrowRight' ? 1 : -1)
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault()
      const track = trackRef.current
      track.scrollTo({ left: event.key === 'Home' ? 0 : track.scrollWidth - track.clientWidth, behavior: behavior() })
    }
  }
  const formatNumber = (number) => String(number).padStart(2, '0')
  const heading = noun.charAt(0).toUpperCase() + noun.slice(1)

  return (
    <div ref={ref} className={`section__container ${visible ? 'reveal' : ''}`}>
      <div className="gallery__heading">
        <div><p className="section__eyebrow">{eyebrow}</p><h2 className="section__title">{heading}</h2><p className="gallery__subtitle">{title}</p></div>
        <div className="gallery__controls">
          <button type="button" className="icon-button" aria-label={`Previous ${noun}`} title={`Previous ${noun}`} aria-controls={id} disabled={!range.previous} onClick={() => move(-1)}><FiArrowLeft /></button>
          <button type="button" className="icon-button" aria-label={`Next ${noun}`} title={`Next ${noun}`} aria-controls={id} disabled={!range.next} onClick={() => move(1)}><FiArrowRight /></button>
        </div>
      </div>
      <div ref={trackRef} id={id} className="gallery__track" role="region" aria-label={label} tabIndex={0} onKeyDown={handleKeyDown}>{children}</div>
      <div className="gallery__footer">
        <div className="gallery__wave" aria-hidden="true"><span style={{ transform: `translateX(${range.progress * 200}%)` }} /></div>
        <p role="status" aria-live="polite" aria-atomic="true" className="gallery__range">{formatNumber(range.first)}{range.first !== range.last ? ` — ${formatNumber(range.last)}` : ''} / {formatNumber(itemCount)}</p>
      </div>
    </div>
  )
}

export default HorizontalGallery