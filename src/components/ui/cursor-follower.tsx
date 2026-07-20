'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Custom cursor: a blend-difference dot that grows over interactive
 * elements, and morphs into a gold labeled disc over
 * [data-cursor-label] targets ("View", "Drag").
 */
export function CursorFollower() {
  const dotRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: -100, y: -100 })
  const target = useRef({ x: -100, y: -100 })
  const hovering = useRef(false)
  const visible = useRef(false)
  const [mounted, setMounted] = useState(false)
  const [label, setLabel] = useState<string | null>(null)
  const labelRef = useRef<string | null>(null)

  useEffect(() => {
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
      const el = e.target as HTMLElement
      const labelled = el.closest('[data-cursor-label]') as HTMLElement | null
      const next = labelled?.dataset.cursorLabel ?? null
      if (next !== labelRef.current) {
        labelRef.current = next
        setLabel(next)
      }
      hovering.current = !!el.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor]'
      )
    }

    const handleMouseLeave = () => {
      visible.current = false
    }

    let frame: number
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.12
      pos.current.y += (target.current.y - pos.current.y) * 0.12

      if (dotRef.current) {
        const labelled = !!labelRef.current
        const s = labelled ? 1 : hovering.current ? 2.8 : 1
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

  const labelled = !!label

  return (
    <div
      ref={dotRef}
      className="fixed top-0 left-0 z-[60] pointer-events-none flex items-center justify-center"
      style={{
        width: labelled ? 76 : 10,
        height: labelled ? 76 : 10,
        borderRadius: '50%',
        backgroundColor: labelled ? 'hsl(38 52% 63%)' : 'hsl(var(--foreground))',
        opacity: 0,
        mixBlendMode: labelled ? 'normal' : 'difference',
        willChange: 'transform',
        transition:
          'width 0.4s cubic-bezier(0.16, 1, 0.3, 1), height 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease',
      }}
    >
      {labelled && (
        <span className="font-display text-[10px] uppercase tracking-[0.22em] text-[hsl(26_20%_7%)] pl-[0.22em] select-none">
          {label}
        </span>
      )}
    </div>
  )
}
