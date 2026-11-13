'use client'

interface MarqueeProps {
  items: string[]
  /** Optional text separator. Omit it to get the house lozenge. */
  separator?: string
  speed?: number
  className?: string
}

export function Marquee({
  items,
  separator,
  speed = 40,
  className = '',
}: MarqueeProps) {
  /* One run of the band: each item followed by a small hairline lozenge */
  const run = (key: string) => (
    <span key={key} className="inline-flex shrink-0 items-center">
      {items.map((item, i) => (
        <span key={`${key}-${i}`} className="inline-flex items-center">
          <span>{item}</span>
          {separator ? (
            <span className="mx-[1.25em] opacity-60">{separator}</span>
          ) : (
            <span className="mx-[1.5em] inline-block h-[0.34em] w-[0.34em] shrink-0 rotate-45 border border-current opacity-60" />
          )}
        </span>
      ))}
    </span>
  )

  return (
    <div
      className={`group/marquee overflow-hidden whitespace-nowrap select-none ${className}`}
      aria-hidden="true"
    >
      <div
        className="inline-flex group-hover/marquee:[animation-play-state:paused] motion-reduce:[animation-play-state:paused]"
        style={{ animation: `marquee ${speed}s linear infinite` }}
      >
        {run('a')}
        {run('b')}
      </div>
    </div>
  )
}
