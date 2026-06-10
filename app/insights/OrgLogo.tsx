'use client'
import { useState, useEffect } from 'react'

/* Square logo mark with a graceful monogram fallback.
   Renders the initials by default and only swaps in the uploaded image
   once it has confirmed-loaded — this avoids the SSR hydration race where
   a 404 fires onError before React attaches its handler. */
export default function OrgLogo({ src, name, size = 44 }: { src?: string; name: string; size?: number }) {
  const [ok, setOk] = useState(false)

  useEffect(() => {
    if (!src) return
    let alive = true
    const img = new Image()
    img.onload = () => { if (alive && img.naturalWidth > 0) setOk(true) }
    img.src = src
    return () => { alive = false }
  }, [src])

  const initials = name
    .replace(/\b(the|of|institute|university|technologies|inc|llc)\b/gi, '')
    .trim()
    .split(/\s+/)
    .map(w => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <div style={{
      width: size, height: size, flexShrink: 0, borderRadius: 8, overflow: 'hidden',
      background: ok ? '#fff' : 'var(--navy-50)',
      border: '1px solid var(--border)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {ok
        ? <img src={src} alt={name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 6 }} />
        : <span style={{ fontFamily: 'var(--font-brand)', fontWeight: 600, fontSize: size * 0.3, letterSpacing: '.02em', color: 'var(--navy-600)' }}>{initials}</span>
      }
    </div>
  )
}
