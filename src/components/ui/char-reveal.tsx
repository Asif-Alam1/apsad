'use client'

import React, { useRef, useEffect, useState } from 'react'

interface CharRevealProps {
  children: string
  className?: string
  delay?: number
  stagger?: number
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  /** wait for this window event before playing (e.g. the preloader) */
  waitForEvent?: string
}

/**
 * Lapidary carve-in: characters rise out of blur one by one,
 * like letters being cut into stone. IO-triggered, reduced-motion safe.
 */
export function CharReveal({
  children,
  className = '',
  delay = 0,
  stagger = 26,
  as: Tag = 'h2',
  waitForEvent,
}: CharRevealProps) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const [armed, setArmed] = useState(!waitForEvent)

  useEffect(() => {
    if (!waitForEvent) return
    const arm = () => setArmed(true)
    window.addEventListener(waitForEvent, arm, { once: true })
    // fallback if the event never fires (e.g. preloader already done)
    const t = setTimeout(arm, 3500)
    return () => {
      window.removeEventListener(waitForEvent, arm)
      clearTimeout(t)
    }
  }, [waitForEvent])

  useEffect(() => {
    if (!armed) return
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [armed])

  const words = children.split(' ')
  let charIndex = 0

  return (
    <Tag
      ref={ref as React.Ref<HTMLHeadingElement>}
      className={className}
      aria-label={children}
    >
      {words.map((word, wi) => (
        <React.Fragment key={wi}>
          <span className="inline-block whitespace-nowrap" aria-hidden="true">
            {word.split('').map((ch, ci) => {
              const i = charIndex++
              return (
                <span key={ci} className="inline-block overflow-hidden align-bottom">
                  <span
                    className="inline-block"
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? 'translateY(0)' : 'translateY(70%)',
                      filter: visible ? 'blur(0)' : 'blur(6px)',
                      transition: `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${delay + i * stagger}ms, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${delay + i * stagger}ms, filter 0.65s cubic-bezier(0.16,1,0.3,1) ${delay + i * stagger}ms`,
                    }}
                  >
                    {ch}
                  </span>
                </span>
              )
            })}
          </span>
          {wi < words.length - 1 && ' '}
        </React.Fragment>
      ))}
    </Tag>
  )
}
