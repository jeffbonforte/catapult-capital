'use client'
import { useEffect } from 'react'

/* Adds .in to [data-reveal] elements as they enter the viewport.
   Elements already on screen are marked before the html.js class
   activates the hidden state, so nothing ever flashes invisible. */
export default function ScrollFx() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    const vh = window.innerHeight
    for (const el of els) {
      const r = el.getBoundingClientRect()
      if (r.top < vh * 0.92 && r.bottom > 0) el.classList.add('in')
    }
    document.documentElement.classList.add('js')
    if (!('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('in'))
      return
    }
    const io = new IntersectionObserver(entries => {
      for (const e of entries) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
      }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0 })
    els.forEach(el => { if (!el.classList.contains('in')) io.observe(el) })
    return () => io.disconnect()
  }, [])
  return null
}
