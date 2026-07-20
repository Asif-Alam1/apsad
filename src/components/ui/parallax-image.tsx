'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import Image from 'next/image'

interface ParallaxImageProps {
  src: string
  alt: string
  speed?: number
  className?: string
  priority?: boolean
  sizes?: string
}

/**
 * Scroll parallax + a clip-path unveiling on first view:
 * the frame opens like a curtain while the photograph settles.
 */
export function ParallaxImage({
  src,
  alt,
  speed = 0.15,
  className = '',
  priority = false,
  sizes = '100vw',
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)
  const [revealed, setRevealed] = useState(false)

  const handleScroll = useCallback(() => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const viewH = window.innerHeight
    const progress = 1 - (rect.top + rect.height) / (viewH + rect.height)
    setOffset((progress - 0.5) * speed * 100)
  }, [speed])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setRevealed(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{
        clipPath: revealed ? 'inset(0 0 0 0)' : 'inset(14% 8% 14% 8%)',
        transition: 'clip-path 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          transform: revealed ? 'scale(1)' : 'scale(1.12)',
          transition: 'transform 1.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          style={{
            objectFit: 'cover',
            transform: `translate3d(0, ${offset}px, 0) scale(1.15)`,
            willChange: 'transform',
          }}
        />
      </div>
    </div>
  )
}
