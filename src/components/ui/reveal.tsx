'use client'

import { useRef, useEffect, useState, type ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}

const offsets: Record<string, string> = {
  up: 'translate3d(0, 48px, 0)',
  down: 'translate3d(0, -48px, 0)',
  left: 'translate3d(48px, 0, 0)',
  right: 'translate3d(-48px, 0, 0)',
}

export function Reveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [hydrated, setHydrated] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setHydrated(true)

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
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const shouldHide = hydrated && !visible

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shouldHide ? 0 : 1,
        transform: shouldHide ? offsets[direction] : 'translate3d(0, 0, 0)',
        transition: visible
          ? `opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`
          : 'none',
      }}
    >
      {children}
    </div>
  )
}
