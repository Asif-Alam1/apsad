'use client'

import { useRef, useEffect, type ReactNode } from 'react'

interface ScrollZoomProps {
  children: ReactNode
  className?: string
  minScale?: number
}

export function ScrollZoom({
  children,
  className = '',
  minScale = 0.88,
}: ScrollZoomProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const handleScroll = () => {
      if (!wrapRef.current || !innerRef.current) return
      const rect = wrapRef.current.getBoundingClientRect()
      const viewH = window.innerHeight
      const progress = Math.max(0, Math.min(1, 1 - rect.top / viewH))
      const scale = minScale + (1 - minScale) * progress
      innerRef.current.style.transform = `scale(${scale})`
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [minScale])

  return (
    <div ref={wrapRef} className={`overflow-hidden ${className}`}>
      <div ref={innerRef} style={{ willChange: 'transform' }}>
        {children}
      </div>
    </div>
  )
}
