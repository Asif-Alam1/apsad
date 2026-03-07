'use client'

import { useRef, useEffect } from 'react'

interface HorizontalTextProps {
  children: string
  className?: string
}

export function HorizontalText({ children, className = '' }: HorizontalTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const handleScroll = () => {
      if (!ref.current || !textRef.current) return
      const rect = ref.current.getBoundingClientRect()
      const viewH = window.innerHeight
      const progress = 1 - (rect.top + rect.height) / (viewH + rect.height)
      const x = 10 - progress * 40
      textRef.current.style.transform = `translateX(${x}%)`
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div ref={ref} className={`overflow-hidden py-8 md:py-12 ${className}`} aria-hidden="true">
      <div
        ref={textRef}
        className="whitespace-nowrap font-serif text-[15vw] md:text-[12vw] font-bold leading-none text-foreground/[0.06] select-none"
        style={{ willChange: 'transform' }}
      >
        {children}
      </div>
    </div>
  )
}
