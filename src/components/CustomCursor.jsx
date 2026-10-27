import { useEffect, useRef } from 'react'

function CustomCursor() {
  const ref = useRef(null)

  useEffect(() => {
    const cursor = ref.current
    const media = matchMedia('(pointer: fine) and (hover: hover) and (prefers-reduced-motion: no-preference)')
    const hide = () => {
      cursor.dataset.visible = 'false'
      document.documentElement.removeAttribute('data-custom-cursor')
    }
    const move = (event) => {
      if (!media.matches || event.pointerType === 'touch') {
        hide()
        return
      }
      cursor.style.setProperty('--cursor-x', `${event.clientX}px`)
      cursor.style.setProperty('--cursor-y', `${event.clientY}px`)
      cursor.dataset.visible = 'true'
      cursor.dataset.interactive = String(Boolean(event.target.closest('a, button, [role="button"]')))
      document.documentElement.setAttribute('data-custom-cursor', 'true')
    }
    document.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerleave', hide)
    window.addEventListener('blur', hide)
    media.addEventListener?.('change', hide)
    return () => {
      document.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', hide)
      window.removeEventListener('blur', hide)
      media.removeEventListener?.('change', hide)
      hide()
    }
  }, [])

  return (
    <div ref={ref} className="custom-cursor" aria-hidden="true" data-visible="false">
      <span className="custom-cursor__head" />
      {Array.from({ length: 5 }, (_, index) => <span key={index} className="custom-cursor__trail" style={{ '--lag': `${35 + index * 24}ms`, '--size': `${6 - index}px`, '--opacity': .65 - index * .1 }} />)}
    </div>
  )
}

export default CustomCursor