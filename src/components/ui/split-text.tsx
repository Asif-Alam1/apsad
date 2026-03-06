'use client'

import React, { useRef, useEffect, useState } from 'react'

interface SplitTextProps {
  children: string
  className?: string
  delay?: number
  stagger?: number
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
}

export function SplitText({
  children,
  className = '',
  delay = 0,
  stagger = 50,
  as: Tag = 'h2',
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
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
  }, [])

  const words = children.split(' ')

  return (
    <Tag ref={ref as React.Ref<HTMLHeadingElement>} className={className}>
      {words.map((word, i) => (
        <React.Fragment key={i}>
          <span className="inline-block overflow-hidden">
            <span
              className="inline-block"
              style={{
                transform: visible ? 'translateY(0)' : 'translateY(105%)',
                opacity: visible ? 1 : 0,
                transition: `transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay + i * stagger}ms, opacity 0.5s ease ${delay + i * stagger}ms`,
              }}
            >
              {word}
            </span>
          </span>
          {i < words.length - 1 && ' '}
        </React.Fragment>
      ))}
    </Tag>
  )
}
