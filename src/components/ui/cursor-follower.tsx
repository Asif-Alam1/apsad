'use client'

import { useEffect, useRef, useState } from 'react'

export function CursorFollower() {
  const dotRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: -100, y: -100 })
  const target = useRef({ x: -100, y: -100 })
  const hovering = useRef(false)
  const visible = useRef(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Skip on touch devices and reduced motion
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isTouch || prefersReduced) return

    setMounted(true)
    document.documentElement.classList.add('custom-cursor')

    const handleMouseMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY }
      if (!visible.current) visible.current = true
    }

    const handleMouseOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor]'
      )
      hovering.current = !!el
    }

    const handleMouseLeave = () => {
      visible.current = false
    }

    let frame: number
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.12
      pos.current.y += (target.current.y - pos.current.y) * 0.12

      if (dotRef.current) {
        const s = hovering.current ? 2.8 : 1
        dotRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%) scale(${s})`
        dotRef.current.style.opacity = visible.current ? '1' : '0'
      }

      frame = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseover', handleMouseOver, { passive: true })
    document.documentElement.addEventListener('mouseleave', handleMouseLeave)
    frame = requestAnimationFrame(animate)

    return () => {
      document.documentElement.classList.remove('custom-cursor')
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(frame)
    }
  }, [])

  if (!mounted) return null

  return (
    <div
      ref={dotRef}
      className="fixed top-0 left-0 z-[9998] pointer-events-none"
      style={{
        width: 10,
        height: 10,
        borderRadius: '50%',
        backgroundColor: 'hsl(var(--foreground))',
        opacity: 0,
        mixBlendMode: 'difference',
        willChange: 'transform',
        transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1), height 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    />
  )
}
