'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import Image from 'next/image'

interface ParallaxImageProps {
  src: string
  alt: string
  speed?: number
  className?: string
  priority?: boolean
}

export function ParallaxImage({
  src,
  alt,
  speed = 0.15,
  className = '',
  priority = false,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  const handleScroll = useCallback(() => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const viewH = window.innerHeight
    const progress = 1 - (rect.top + rect.height) / (viewH + rect.height)
    setOffset((progress - 0.5) * speed * 100)
  }, [speed])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        style={{
          objectFit: 'cover',
          transform: `translate3d(0, ${offset}px, 0) scale(1.15)`,
          willChange: 'transform',
        }}
      />
    </div>
  )
}
