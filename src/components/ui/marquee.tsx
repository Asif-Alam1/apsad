'use client'

interface MarqueeProps {
  items: string[]
  separator?: string
  speed?: number
  className?: string
}

export function Marquee({
  items,
  separator = '\u2022',
  speed = 40,
  className = '',
}: MarqueeProps) {
  const content = items.map((item) => `${item} ${separator} `).join('')

  return (
    <div
      className={`overflow-hidden whitespace-nowrap select-none ${className}`}
      aria-hidden="true"
    >
      <div
        className="inline-flex"
        style={{ animation: `marquee ${speed}s linear infinite` }}
      >
        <span className="inline-block">{content}</span>
        <span className="inline-block">{content}</span>
      </div>
    </div>
  )
}
