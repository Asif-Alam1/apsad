'use client'

import { useEffect, useState } from 'react'

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'
const DONE_EVENT = 'apsad:preloader-done'
const SEEN_KEY = 'apsad-preloaded'

export function preloaderWillRun() {
  if (typeof window === 'undefined') return false
  return (
    !window.sessionStorage.getItem(SEEN_KEY) &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export { DONE_EVENT }

/**
 * Opening curtain — once per session. Gold wordmark carves in on black,
 * hairline draws, curtain lifts. Dispatches DONE_EVENT so the hero can
 * hold its entrance until the reveal.
 */
export function Preloader() {
  const [phase, setPhase] = useState<'idle' | 'play' | 'lift' | 'gone'>('idle')

  useEffect(() => {
    if (!preloaderWillRun()) {
      setPhase('gone')
      window.dispatchEvent(new Event(DONE_EVENT))
      return
    }

    window.sessionStorage.setItem(SEEN_KEY, '1')
    document.documentElement.style.overflow = 'hidden'
    setPhase('play')

    const lift = setTimeout(() => {
      setPhase('lift')
      window.dispatchEvent(new Event(DONE_EVENT))
      document.documentElement.style.overflow = ''
    }, 1900)
    const gone = setTimeout(() => setPhase('gone'), 3000)

    return () => {
      clearTimeout(lift)
      clearTimeout(gone)
      document.documentElement.style.overflow = ''
    }
  }, [])

  if (phase === 'gone' || phase === 'idle') return null

  const play = phase === 'play'

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[70] flex items-center justify-center bg-[hsl(26_20%_4%)]"
      style={{
        transform: phase === 'lift' ? 'translateY(-100%)' : 'translateY(0)',
        transition: `transform 1.05s ${EASE}`,
      }}
    >
      <div
        className="text-center"
        style={{
          opacity: phase === 'lift' ? 0 : 1,
          transition: `opacity 0.4s ease`,
        }}
      >
        <p className="font-display text-4xl sm:text-5xl tracking-[0.3em] text-[hsl(38_52%_63%)] pl-[0.3em]">
          {'APSAD'.split('').map((ch, i) => (
            <span
              key={i}
              className="inline-block"
              style={{
                opacity: play ? 1 : 0,
                transform: play ? 'translateY(0)' : 'translateY(60%)',
                filter: play ? 'blur(0)' : 'blur(8px)',
                transition: `opacity 0.7s ${EASE} ${0.15 + i * 0.08}s, transform 0.7s ${EASE} ${0.15 + i * 0.08}s, filter 0.7s ${EASE} ${0.15 + i * 0.08}s`,
              }}
            >
              {ch}
            </span>
          ))}
        </p>
        <div
          className="h-px bg-[hsl(38_52%_63%)]/60 mx-auto mt-6 mb-5"
          style={{
            width: play ? '100%' : '0%',
            transition: `width 1s ${EASE} 0.7s`,
          }}
        />
        <p
          className="font-display text-[11px] tracking-[0.42em] uppercase text-[hsl(36_14%_68%)] pl-[0.42em]"
          style={{
            opacity: play ? 1 : 0,
            transition: `opacity 0.8s ease 1.1s`,
          }}
        >
          Depuis 1960 · Beirut
        </p>
      </div>
    </div>
  )
}
